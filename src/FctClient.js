import React from 'react';

import { FctQuery, FctResult } from '../lib/facet-js-client.js';

// -- Hardwired test fixtures ----------
// TO DO: Remove
import fixtureLinkedDataTweets from '../test/fixtures/linked_data_tweets.js';
import fixtureSkiResortsDescs from '../test/fixtures/ski_resorts_descs.js';
import fixtureFilters1 from '../test/fixtures/filters1.js';

const presets = new Map();
presets.set('linked_data_tweets', fixtureLinkedDataTweets);
presets.set('ski_resorts_descs', fixtureSkiResortsDescs);
presets.set('filters1', fixtureFilters1);

// -------------------------------------

import FctRspDbActvty from './FctRspDbActvty';
import FctRspRslt from './FctRspRslt';
import FctSearchInputEditor from './FctSearchInputEditor';
import FctFilters from './FctFilters';

const FCT_CLIENT_DFLT_VIEW_TYPE = "text";

const componentContainerStyle = {
  padding: '10px',
  border: 'solid 2px lightgray',
  marginBottom: '20px'
}
// 


class FctClient extends React.Component {
  constructor(props) {
    super(props);
    console.log('FctClient#constructor: props:', props)
    this.state = {
      searchText: "",
      fctResult: null,
      viewType: props.viewType || FCT_CLIENT_DFLT_VIEW_TYPE,
      tripleTerminology: "eav",   // TO DO: Initialize from UI control. spo | eav
      preset: "none",
    };

    this.handleSearchInputEditorChange = this.handleSearchInputEditorChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleViewChange = this.handleViewChange.bind(this);
    this.handlePresetChange = this.handlePresetChange.bind(this); // TO DO: Remove once testing complete
    this.handleSetSubjectFocus = this.handleSetSubjectFocus.bind(this);
    this.handleDropQueryFilter = this.handleDropQueryFilter.bind(this);
    this.handleDropQueryText = this.handleDropQueryText.bind(this);

    // viewLimit may be overridden in the UI.
    // TO DO: Add UI control and intialize to FctQuery default.
    this.viewLimit = FctQuery.FCT_QRY_DFLT_VIEW_LIMIT; 
    // serviceEndpoint may be overridden in the UI.
    // TO DO: Add UI control and initialize to FctQuery default.
    this.serviceEndpoint = FctQuery.FCT_QRY_DFLT_SVC_ENDPOINT; 

    this.fctQuery = new FctQuery();
    this.fctQuery.setViewType(FCT_CLIENT_DFLT_VIEW_TYPE);
    this.fctQuery.setServiceEndpoint(this.serviceEndpoint);
    this.fctQuery.setViewLimit(this.viewLimit);
  }

  handleSearchInputEditorChange(searchInputEditorText) {
    this.setState({ searchText: searchInputEditorText });
  }


  handleSearch(searchInputEditorText) {
    console.log('FctClient#handleSearch');
    searchInputEditorText = searchInputEditorText.trim();
    this.setState({ searchText: searchInputEditorText }); // Async!

    if (!searchInputEditorText) {
      this.setState({ fctResult: null });
    }
    else {
      this.fctQuery.queryText = searchInputEditorText;
      this.search();
    }
  }

  search() {
    this.fctQuery.execute()
      .then(qryResult => {
        this.setState({ fctResult: qryResult });
      })
      .catch(err => {
        // TO DO: 
        // Display the error in the UI
        // Facet does return some error text. e.g. sparql compilation on invalid XML.
        console.log('FctClient#search: Error: ' + err.message);
      });
  }
  
  handleViewChange(event) {
    this.updateView(event.target.value);
  }

  updateView(viewType) {
    if (viewType) {
      this.setState({ viewType }); // Async!
      this.fctQuery.setViewType(viewType);
    }
    if (this.state.fctResult)
      // this.handleSearch(this.state.searchText); // Update any existing results to reflect the new view
      this.search(); // Update any existing results to reflect the new view
  }

  handlePresetChange(event) {
    let presetKey = event.target.value;
    switch (presetKey) {
      case "none":
        this.fctQuery = new FctQuery();
        break;
      default:
        this.fctQuery = new FctQuery(presets.get(presetKey));
        break;
    }
    this.fctQuery.setServiceEndpoint(this.serviceEndpoint);
    this.fctQuery.setViewLimit(this.viewLimit);

    // Update the UI:
    // Set the controls holding Facet request inputs to match the preset's settings.
    // Relevant controls: FctSearchInputEditor, Preset select list, View select list
    this.setState({ 
      searchText: this.fctQuery.queryText, 
      preset: presetKey,  
      fctResult: null, 
      viewType: this.fctQuery.getViewType(), 
    }); // Async!

    // Update the UI:
    // - Perform a new search based on the new search text.
    // - The UI controls holding the Facet response output will be updated automatically.
    this.handleSearch(this.fctQuery.queryText);
  }

  handleSetSubjectFocus(subjectId) {
    console.log('FctClient#handleSetSubjectFocus: subjectId:', subjectId) // TO DO: Remove
    // this.fctQuery.setViewSubjectIndex(subjectId); // TO DO: Enable
  }

  handleDropQueryFilter(filterId) {
    console.log('FctClient#handleDropQueryFilter: filterId:', filterId) // TO DO: Remove
    // this.fctQuery.removeQueryFilter(filterId); // TO DO: Enable
  }

  handleDropQueryText() {
    console.log('FctClient#handleDropQueryText') // TO DO: Remove
    // this.fctQuery.removeQueryText(); // TO DO: Enable
  }

  render() {
    console.log('FctClient#render: this.props:', this.props);
    const dbActivity = this.state.fctResult ? this.state.fctResult.json.facets["db-activity"] : '';
    const qryResult = this.state.fctResult ? this.state.fctResult.json.facets.result : null;
    const qryFilters = this.fctQuery.queryFilterDescriptors();

    // TO DO: Build the options names/values from the presets map contents.

    return (
      <div>

        <div className="col-sm-12">
          <div className="form-group row">
            <label className="col-sm-1 col-form-label text-right">Preset:</label>
            <div className="col-sm-3">
              <select value={this.state.preset} className="custom-select" onChange={this.handlePresetChange}>
                <option value="none">None</option>
                <option value="linked_data_tweets">linked data tweets list</option>
                <option value="ski_resorts_descs">ski resort descriptions</option>
                <option value="filters1">filters1 (empty resultset)</option>
              </select>
            </div>
          </div>
        </div>

        <p>Component: FctSearchInputEditor</p>
        <div style={componentContainerStyle}>
          <FctSearchInputEditor 
            searchText={this.state.searchText} 
            onSearch={this.handleSearch} 
            onChange={this.handleSearchInputEditorChange}
            />
        </div>

        <div className="col-sm-12">
          <div className="form-group row">
            <label htmlFor="frmViewType" className="col-sm-1 col-form-label text-right">View:</label>
            <div className="col-sm-4">
              <select value={this.state.viewType} className="custom-select" onChange={this.handleViewChange}>
                <option value="properties-in">properties-in : TO DO! [vt=properties-in]</option>
                <option value="propval-list">propval-list : [vt=propval-list]</option>
                <option value="classes">classes [vt=classes]</option>
                <option value="text">entities [vt=text]</option>
                <option value="text-d">text-d [vt=text-d]</option>
                <option value="text-properties">text-properties [vt=text-properties]</option>
                <option value="properties">attributes [vt=properties]</option>
                <option value="list-count">distinct (count) [vt=list-count]</option>
                <option value="list">list [vt=list]</option>
              </select>
            </div>
          </div>
        </div>

        <p>Component: FctRspRslt</p>
        <div style={componentContainerStyle}>
          <FctRspRslt qryResult={qryResult} />
        </div>

        <p>Component: FctFilters</p>
        <div style={componentContainerStyle}>
          <FctFilters
            qryFilters={qryFilters}
            tripleTerminology={this.state.tripleTerminology}
            onSetSubjectFocus={this.handleSetSubjectFocus}
            onDropQueryFilter={this.handleDropQueryFilter}
            onDropQueryText={this.handleDropQueryText}
          />
        </div>

        <p>Component: FctRspDbActivity</p>
        <div style={componentContainerStyle}>
          <FctRspDbActvty dbActivity={dbActivity} />
        </div>

      </div>
    );
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('FctClient#componentDidUpdate: prevProps.viewType: ', prevProps.viewType);
    console.log('FctClient#componentDidUpdate: this.props.viewType: ', this.props.viewType);
    console.log('FctClient#componentDidUpdate: prevProps.ts: ', prevProps.ts);
    console.log('FctClient#componentDidUpdate: this.props.ts: ', this.props.ts);
    console.log('FctClient#componentDidUpdate: prevState.viewType: ', prevState.viewType);
    console.log('FctClient#componentDidUpdate: this.state.viewType: ', this.state.viewType);

    // props.viewType !== undefined indicates that the viewType is being set via a URL query string.
    // e.g. http://localhost:8600/?action=setView&viewType=text-properties&...
    // This is the only occasion where props.viewType should override state.viewType.
    // Changes of the viewType via UI controls, rather than via a querystring, change state.viewType directly,
    // and don't change props.viewType.
    // We cannot simply always set state.viewType from props.viewType (other than in the constructor) because
    // this would ignore any update to viewType made through UI controls.
    //
    // We cannot use static method getDerivedStateFromProps(props, state), as props will then always override state.
    //
    // props.ts acts as a refresh flag and is only used when setting the view via a URL querystring 
    // or performing some other action specified in the query string.

    let newView = undefined; // undefined => don't change the current viewType.
    let refreshSearchResults = false;

    // Check for changes in props.ts
    if (prevProps.ts !== this.props.ts)
      refreshSearchResults = true;

    // Check for changes in props.viewType
    if (prevProps.viewType !== this.props.viewType)
    {
      if (this.props.viewType !== this.state.viewType)
      {
        newView = this.props.viewType;
        refreshSearchResults = true;
      }
    }

    // Check for changes in props.action 
    if (this.props.action && prevProps.ts !== this.props.ts) {
      newView = this.props.viewType; // Redundant? Done above?
      this.performUiAction();
      refreshSearchResults = true;
    }

    if (refreshSearchResults) {
      console.log('FctClient#componentDidUpdate: #updateView:', newView);
      // updateView 
      // - optionally updates this.state.viewType
      // - updates any existing Facet search results 
      this.updateView(newView); 
    }
  }

  performUiAction() {
    switch (this.props.action.name) {
      case "setTextProperty": 
        console.log('FctClient#performUiAction: setTextProperty:', this.props.action.propertyIri);
        this.fctQuery.queryTextProperty = this.props.action.propertyIri;
        break;
      case "openProperty":
          // - Add filter: ?s[n] has the given property.
          //     e.g. ?s1 skiresorts:advanced_slopes ?s2
          // - Display a list of values (instances of values) for the property
          // Create XML element:
          // <property iri="{propertyURI}" [exclude="yes"]>
          //   <view type="list" limit="{limit}" offset="0" />
          // </property>
        console.log('FctClient#performUiAction: openProperty:', this.props.action.propertyIri);
        let propSubjIndx = this.fctQuery.addProperty(
          this.props.action.propertyIri,
          this.fctQuery.getViewSubjectIndex(),
          this.props.action.excludeProperty
          // sameAs,
          // inferenceContext
          );
        console.log('FctClient#performUiAction: propSubjIndx:', propSubjIndx);
        console.log('FctClient#performUiAction: this.props.viewType:', this.props.viewType);
        this.fctQuery.setViewSubjectIndex(propSubjIndx);
        this.fctQuery.setViewType(this.props.viewType);
        this.fctQuery.setViewOffset(0); // The existing view limit should be retained.
        break;
      case "cond": 
        // Set a condition on a subject node
        // Create an XML <cond> element, e.g.:
        // <property iri="http://www.openlinksw.com/ski_resorts/schema#advanced_slopes">
        //   <cond type="eq" neg="" xml:lang="" datatype="http://www.w3.org/2001/XMLSchema#integer">27</cond>
        // </property>
        console.log('FctClient#permformUiAction: cond:', this.props.action.conditionType);
        // After setting a condition, FctQuery#setSubjectCondition sets subject node to 1, 
        // the view type to 'text-d' and the view offset set to 0.
        this.fctQuery.setSubjectCondition(
          this.props.action.conditionType,
          this.props.action.value, 
          this.props.action.valueDataType,
          this.props.action.valueLang,
          this.props.action.negate
        );
        break;
    }
  }

}

export default FctClient;

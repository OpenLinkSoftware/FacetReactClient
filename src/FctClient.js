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

// TO DO: Allow defaults to be set through a config .js file.
const FCT_QRY_DFLT_VIEW_LIMIT = 50; // Default view limit
const FCT_QRY_DFLT_VIEW_TYPE = "text";
// const FCT_QRY_DFLT_SVC_ENDPOINT = 'http://localhost:8896/fct/service';
const FCT_QRY_DFLT_SVC_ENDPOINT = 'http://linkeddata.uriburner.com/fct/service';

const componentContainerStyle = {
  padding: '10px',
  border: 'solid 2px lightgray',
  marginBottom: '20px'
}
// 


class FctClient extends React.Component {
  constructor() {
    super();
    this.state = {
      searchText: "",
      viewType: FCT_QRY_DFLT_VIEW_TYPE,
      fctResult: null,
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

    this.fctQuery = new FctQuery();
    this.fctQuery.setServiceEndpoint(FCT_QRY_DFLT_SVC_ENDPOINT);
    this.fctQuery.setViewLimit(FCT_QRY_DFLT_VIEW_LIMIT);
    this.fctQuery.setViewType(FCT_QRY_DFLT_VIEW_TYPE);
  }

  handleSearchInputEditorChange(searchInputEditorText) {
    this.setState({ searchText: searchInputEditorText });
  }

  handleSearch(searchInputEditorText) {
    searchInputEditorText = searchInputEditorText.trim();
    this.setState({ searchText: searchInputEditorText }); // Async!

    if (!searchInputEditorText) {
      this.setState({ fctResult: null });
    }
    else {
      this.fctQuery.queryText = searchInputEditorText;
      this.fctQuery.execute()
        .then(qryResult => {
          console.log('FacetClient#handleSearch: New result:', JSON.stringify(qryResult._resultJson)); // TO DO: Remove
          this.setState({ fctResult: qryResult });
        })
        .catch(err => {
          // TO DO: 
          // Display the error in the UI
          // Facet does return some error text. e.g. sparql compilation on invalid XML.
          console.log('FctClient#handleSearch: Error: ' + err.message);
        });
    }
  }

  handleViewChange(event) {
    this.fctQuery.setViewType(event.target.value);
    this.setState({ viewType: event.target.value }); // Async!
    if (this.state.fctResult)
      this.handleSearch(this.state.searchText); // Update any existing results to reflect the new view
  }

  handlePresetChange(event) {
    let presetKey = event.target.value;
    switch (presetKey) {
      case "none":
        this.fctQuery = new FctQuery();
        this.fctQuery.setServiceEndpoint(FCT_QRY_DFLT_SVC_ENDPOINT); // TO DO: Make this a default in the constructor
        this.fctQuery.setViewLimit(FCT_QRY_DFLT_VIEW_LIMIT); // TO DO: Make this a default in the constructor
        this.fctQuery.setViewType(FCT_QRY_DFLT_VIEW_TYPE); // TO DO: Make this a default in the constructor
        break;
      default:
          this.fctQuery = new FctQuery(presets.get(presetKey));
          this.fctQuery.setServiceEndpoint(FCT_QRY_DFLT_SVC_ENDPOINT); // TO DO: Make this a default in the constructor
        break;  
    }

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
                <option value="classes">classes [vt=classes]</option>
                <option value="text">entities [vt=text]</option>
                <option value="text-properties">text-properties [vt=text-properties]</option>
                <option value="properties">attributes [vt=properties]</option>
                <option value="list-count">distinct (count) [vt=list-count]</option>
                <option value="list">list [vt=list]</option>
              </select>
            </div>
          </div>
        </div>

        <p>Component: FctRspDbActivity</p>
        <div style={componentContainerStyle}>
          <FctRspDbActvty dbActivity={dbActivity} />
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
      </div>
    );
  }
}

export default FctClient;

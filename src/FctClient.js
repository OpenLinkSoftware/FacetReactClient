import React from 'react';
import { Link } from 'react-router-dom'

import FctUiUtil from './FctUiUtil';
import { FctQuery, FctResult } from '../lib/facet-js-client.js';
import FctErrCntnr from './FctErrCntnr';
import FctRspDbActvty from './FctRspDbActvty';
import FctRspRslt from './FctRspRslt';
import FctRspLimit from './FctRspLimit';
import FctRspPager from './FctRspPager';
import FctSearchInputEditor from './FctSearchInputEditor';
import FctFilters from './FctFilters';
import FctViewHeader from './FctViewHeader';
import FctErrModal from './FctErrModal';

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

class ErrorBoundary extends React.Component {

  constructor(props) {
    super(props);
    this.state = { hasError: false, errorMsg: null };
    this.cbClearError = this.cbClearError.bind(this);
  }

  cbClearError() {
    this.setState({ hasError: false, errorMsg: null });
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, errorMsg: error.message };
  }

  componentDidCatch(error, errorInfo) {
    // Keep these console.log calls to aid user error reporting.
    console.log('ErrorBoundary#componentDidCatch - error:', error);
    console.log('ErrorBoundary#componentDidCatch - errorInfo:', errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <FctErrModal show={true} cbClearError={this.cbClearError} errorMsg={this.state.errorMsg} />;
    }
    return this.props.children;
  }
}

// -------------------------------------

class ForcedError extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.forceError) {
      this.props.cbClearForcedError();
      throw Error(`Forced error to test error boundary: ${new Date()}`);
    }
    return null;
  }
}

// -------------------------------------

const FCT_CLIENT_DFLT_VIEW_TYPE = "text";

const componentContainerStyle = {
  padding: '5px',
  border: 'solid 2px lightgray',
  marginBottom: '5px'
}
// 

class FctClient extends React.Component {
  constructor(props) {
    super(props);
    console.log('FctClient#constructor: props:', props)
    this.state = {
      searchText: "",
      fctResult: null,
      fctError: null,
      viewType: props.viewType || FCT_CLIENT_DFLT_VIEW_TYPE,
      viewSubjectIndex: 1,
      tripleTerminology: "eav",   // TO DO: Initialize from UI control. spo | eav
      preset: "none",
      forcedError: false,
    };

    this.fctUiUtil = new FctUiUtil(this.state.tripleTerminology);

    this.handleChangeSearchEntityText = this.handleChangeSearchEntityText.bind(this);
    this.handleSearchOnEntityText = this.handleSearchOnEntityText.bind(this);
    this.handleViewListChange = this.handleViewListChange.bind(this);
    this.handleSetSubjectFocus = this.handleSetSubjectFocus.bind(this);
    this.handleDropQueryFilter = this.handleDropQueryFilter.bind(this);
    this.handleRowLimitChange = this.handleRowLimitChange.bind(this);
    this.handlePresetChange = this.handlePresetChange.bind(this); // TO DO: Remove once testing complete
    this.handleForceError = this.handleForceError.bind(this); // TO DO: Remove once testing complete

    // viewLimit may be overridden in the UI.
    // TO DO: Add UI control and intialize to FctQuery default.
    // this.viewLimit = FctQuery.FCT_QRY_DFLT_VIEW_LIMIT; 
    this.viewLimit = 50;
    // serviceEndpoint and describeEndpoint may be overridden in the UI.
    // TO DO: Add UI control and initialize to FctQuery defaults.
    this.serviceEndpoint = FctQuery.FCT_QRY_DFLT_SVC_ENDPOINT;
    this.describeEndpoint = FctQuery.DESCRIBE_DFLT_SVC_ENDPOINT;
    // TO DO: Remove
    // this.serviceEndpoint = "http://localhost:8896/fct/service";
    // this.describeEndpoint = "http://localhost:8896/describe/";

    this.fctQuery = new FctQuery();
    this.fctQuery.setViewType(FCT_CLIENT_DFLT_VIEW_TYPE);
    this.fctQuery.setServiceEndpoint(this.serviceEndpoint);
    this.fctQuery.setViewLimit(this.viewLimit);
  }

  handleChangeSearchEntityText(searchText) {
    this.setState({ searchText: searchText, fctError: null });
  }

  handleSearchOnEntityText(searchText) {
    console.log('FctClient#handleSearchOnEntityText');
    searchText = searchText.trim();
    this.setState({ searchText: searchText }); // Async!

    if (!searchText) {
      this.setState({ fctResult: null, fctError: null });
    }
    else {
      this.fctQuery.queryText = searchText;
      this.search();
    }
  }

  handleForceError() {
    this.setState({ forcedError: true });
  }

  search() {
    if (!this.fctQuery.queryText)
      this.setState({ fctResult: null, fctError: null });
    else {
      this.fctQuery.execute()
        .then(qryResult => {
          this.setState({ fctResult: qryResult, fctError: null });
        })
        .catch(err => {
          this.setState({ fctResult: null, fctError: err })
        });
    }
  }

  handleViewListChange(event) {
    this.updateView(event.target.value);
  }

  // updateView 
  // - optionally updates the view type in the Facet input XML.
  // - executes a new Facet search and updates the Facet search results.
  updateView(viewType) {
    if (viewType) {
      this.setState({ viewType }); // Async!
      this.fctQuery.setViewType(viewType);
    }
    if (this.state.fctResult || this.state.fctError)
      this.search(); // Update any existing results or failed prior search to reflect the new view
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
    this.setState({
      searchText: this.fctQuery.queryText,
      preset: presetKey,
      fctResult: null,
      fctError: null,
      viewType: this.fctQuery.getViewType(),
    }); // Async!
    // - Perform a new search based on the new search text.
    // - The UI controls holding the Facet response output will be updated automatically.
    this.handleSearchOnEntityText(this.fctQuery.queryText);
  }

  handleSetSubjectFocus(subjectId) {
    console.log('FctClient#handleSetSubjectFocus: subjectId:', subjectId) // TO DO: Remove
    let newView = subjectId == 1 ? 'text-d' : 'list';
    this.fctQuery.setViewSubjectIndex(subjectId);
    this.setState({ viewSubjectIndex: subjectId, viewType: newView }); // Async!
    this.updateView(newView);
  }

  handleDropQueryFilter(filterId) {
    console.log('FctClient#handleDropQueryFilter: filterId:', filterId) // TO DO: Remove
    this.fctQuery.removeQueryFilter(filterId); // May change the view type if the removed filter had the subject focus
    // If the removed filter was a <text> element, clear the searchInputEditor input to reflect this.
    if (!this.fctQuery.queryText)
      this.handleChangeSearchEntityText("");
    this.updateView(this.fctQuery.getViewType());
  }

  handleRowLimitChange(limit) {
    console.log('FctClient#handleRowLimitChange: limit:', limit) // TO DO: Remove
    this.fctQuery.setViewLimit(limit);
    this.search();
  }

  render() {
    console.log('FctClient#render: this.props:', this.props);
    const dbActivity = this.state.fctResult ? this.state.fctResult.json.facets["db-activity"] : '';
    const qryResult = this.state.fctResult ? this.state.fctResult.json.facets.result : null;
    const qryFilters = this.fctQuery.queryFilterDescriptors();
    const viewSubjectIndex = this.fctQuery.getViewSubjectIndex();
    const rowLimit = this.fctQuery.getViewLimit();

    // TO DO: Build the options names/values from the presets map contents.

    return (
      <ErrorBoundary>
        <div className="container">
          <h5>Facets Components - Test page</h5>
          <Link to="/">Full UI</Link>
          <div className="row">
            <div className="col-sm-12">
              <ForcedError forceError={this.state.forcedError} cbClearForcedError={() => this.setState({ forcedError: false })} />
              <div>
                <div>Component: FctSearchInputEditor</div>
                <div style={componentContainerStyle}>
                  <FctSearchInputEditor
                    searchText={this.state.searchText}
                    onSearch={this.handleSearchOnEntityText}
                    onChange={this.handleChangeSearchEntityText}
                  />
                </div>

                <div className="col-sm-12">
                  <div className="form-group row">
                    <label htmlFor="frmViewType" className="col-sm-1 col-form-label text-right">View:</label>
                    <div className="col-sm-4">
                      <select value={this.state.viewType} className="custom-select" onChange={this.handleViewListChange}>
                        <option value="properties-in">properties-in : [vt=properties-in]</option>
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
                    <label className="col-sm-1 col-form-label text-right">Preset:</label>
                    <div className="col-sm-3">
                      <select value={this.state.preset} className="custom-select" onChange={this.handlePresetChange}>
                        <option value="none">None</option>
                        <option value="linked_data_tweets">linked data tweets list</option>
                        <option value="ski_resorts_descs">ski resort descriptions</option>
                        <option value="filters1">filters1 (empty resultset)</option>
                      </select>
                    </div>
                    <div className="col-sm-2">
                      <button className="btn btn-primary" onClick={this.handleForceError}>Force error</button>
                    </div>
                  </div>
                </div>

                <div>Component: FctErrCntnr</div>
                <div style={componentContainerStyle}>
                  <FctErrCntnr
                    fctError={this.state.fctError}
                  />
                </div>

                <div>Component: FctViewHeader</div>
                <div style={componentContainerStyle}>
                  <FctViewHeader
                    qryResult={qryResult}
                    fctUiUtil={this.fctUiUtil}
                    queryText={this.fctQuery.queryText}
                    viewSubjectIndex={viewSubjectIndex}
                  />
                </div>

                <div>Component: FctFilters</div>
                <div style={componentContainerStyle}>
                  <FctFilters
                    viewSubjectIndex={viewSubjectIndex}
                    qryFilters={qryFilters}
                    fctUiUtil={this.fctUiUtil}
                    onSetSubjectFocus={this.handleSetSubjectFocus}
                    onDropQueryFilter={this.handleDropQueryFilter}
                    location={location}
                  />
                </div>

                <div className="col-sm-12">
                  <div className="row">
                    <div className="col-sm-3">
                      <div>Component: FctRspLimit</div>
                      <div style={componentContainerStyle}>
                        <FctRspLimit limit={rowLimit} onChange={this.handleRowLimitChange} />
                      </div>
                    </div>
                    <div className="col-sm-9">
                      <div>Component: FctRspPager</div>
                      <div style={componentContainerStyle}>
                        <FctRspPager qryResult={qryResult} />
                      </div>
                    </div>
                  </div>
                </div>

                <div>Component: FctRspRslt</div>
                <div style={componentContainerStyle}>
                  <FctRspRslt
                    qryResult={qryResult}
                    describeEndpoint={this.describeEndpoint}
                    fctUiUtil={this.fctUiUtil}
                    location={this.props.location}
                  />
                </div>

                <div>Component: FctRspDbActivity</div>
                <div style={componentContainerStyle}>
                  <FctRspDbActvty dbActivity={dbActivity} />
                </div>

              </div>
            </div>
          </div>
        </div>
      </ErrorBoundary>
    );
  }

  componentDidUpdate(prevProps, prevState) {
    // console.log('FctClient#componentDidUpdate: prevProps.viewType: ', prevProps.viewType);
    // console.log('FctClient#componentDidUpdate: this.props.viewType: ', this.props.viewType);
    // console.log('FctClient#componentDidUpdate: prevProps.ts: ', prevProps.ts);
    // console.log('FctClient#componentDidUpdate: this.props.ts: ', this.props.ts);
    // console.log('FctClient#componentDidUpdate: prevState.viewType: ', prevState.viewType);
    // console.log('FctClient#componentDidUpdate: this.state.viewType: ', this.state.viewType);

    // Check for a pending Facet action to be performed.
    //
    // props.action may relate to a previously executed action. (It may persist across renders,
    // even though already executed, until another action is specified in a URL query string.)
    //
    // props.ts acts as a refresh flag and is only used when an action has been specified in 
    // the query string. A difference in prevProps.ts/props.ts signifies this is a new action
    // to execute, not a previously executed action.
    //
    // props.viewType !== undefined indicates that the viewType is being set via a URL query string.
    // e.g. http://localhost:8600/?action=setView&viewType=text-properties&...
    // This is the only occasion where props.viewType should override state.viewType.
    // Changes of the viewType via UI controls, rather than via a querystring, change state.viewType directly,
    // and don't change props.viewType.
    // We cannot simply always set state.viewType from props.viewType (other than in the constructor) because
    // this would ignore any update to viewType made through UI controls.
    //
    // We cannot use static method getDerivedStateFromProps(props, state), as props will then always override state.

    if (this.props.action && prevProps.ts !== this.props.ts) {
      this.performFctAction();
      console.log('FctClient#componentDidUpdate: #updateView:', this.props.viewType);
      this.updateView(this.props.viewType);
    }
  }

  // Performs a Facet action extracted from a query string.
  // A Facet action is one that manipulates the Facet service
  // input XML.
  // 
  // Subsequently, in updateView(), the new input XML is
  // submitted to the Facet service and the new search results handled.
  performFctAction() {
    switch (this.props.action.name) {
      case "setTextProperty":
        console.log('FctClient#performFctAction: setTextProperty:', this.props.action.propertyIri);
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
        console.log('FctClient#performFctAction: openProperty:', this.props.action.propertyIri);
        let propSubjIndx = this.fctQuery.addProperty(
          this.props.action.propertyIri,
          this.fctQuery.getViewSubjectIndex(),
          this.props.action.excludeProperty
          // sameAs,
          // inferenceContext
        );
        console.log('FctClient#performFctAction: propSubjIndx:', propSubjIndx);
        console.log('FctClient#performFctAction: this.props.viewType:', this.props.viewType);
        this.fctQuery.setViewSubjectIndex(propSubjIndx);
        this.fctQuery.setViewType(this.props.viewType);
        this.fctQuery.setViewOffset(0); // The existing view limit should be retained.
        break;
      case "openPropertyOf":
        // - Add filter: ?s[n] is the object of the given property.
        //     e.g. ?s[n+1] opltw:madeTweet ?s[n]
        // - Display a list of entities matching ?s[n+1]
        // Remove existing <view> element.
        // Create XML element:
        // <property-of iri="{propertyURI}" [exclude="yes"]>
        //   <view type="list" limit="{limit}" offset="0" />
        // </property-of>
        // The new <view> element automatically shifts the focus from ?s[n] to ?s[n+1].
        console.log('FctClient#performFctAction: openPropertyOf:', this.props.action.propertyIri);
        let propOfSubjIndx = this.fctQuery.addPropertyOf(
          this.props.action.propertyIri,
          this.fctQuery.getViewSubjectIndex(),
          this.props.action.excludeProperty
          // sameAs,
          // inferenceContext
        );
        console.log('FctClient#performFctAction: propOfSubjIndx:', propOfSubjIndx);
        console.log('FctClient#performFctAction: this.props.viewType:', this.props.viewType);
        this.fctQuery.setViewSubjectIndex(propOfSubjIndx);
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
      case "setClass":
        // - Add filter: ?s[n] is an instance of the given class. 
        //     e.g. ?s1 is a skiresort:SkiResort 
        // Create XML element:
        // <class>
        console.log('FctClient#performFctAction: setClass:', this.props.action.classIri);
        this.fctQuery.setSubjectClass(this.props.action.classIri);
        this.fctQuery.setViewType(this.props.viewType);
        break;
    }
  }
}

export default FctClient;

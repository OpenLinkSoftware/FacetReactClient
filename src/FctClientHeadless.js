import FctUiUtil from './FctUiUtil';
import { FctQuery, FctResult } from '../lib/facet-js-client.js';

// const DFLT_DESCRIBE_ENDPOINT = 'http://linkeddata.uriburner.com/describe/';
const DFLT_DESCRIBE_ENDPOINT = 'http://localhost:8896/describe/';

// Disabled - Use the defaults in FctJsClient instead
//
// const DFLT_SERVICE_ENDPOINT = 'http://linkeddata.uriburner.com/fct/service';
// const DFLT_VIEW_LIMIT = 50;
// const DFLT_VIEW_TYPE = "text";

//
// FctClientHeadless is a bridge which converts UI events into
// actions on a FctQuery instance. It is responsible for 
// triggering new Facet searches and handling Facet results.
//
// FctClientHeadless is NOT a React component. It is a class
// which provides a means of sharing FctQuery state and data
// across pages via a React context. It intentionally UIless,
// aka headless, and doesn't render anything. 
//
// In contrast, FctClient performs a similar function, but IS
// a React Component. FctClient predates FctClientHeadless.
// It requires that all the FctXXX components be its children.
// For this reason, FctClient is only used in PlainComponentsPage
// which contains all the FctXXX components in a single page
// acting as a test rig. It doesn't allow splitting of the
// FctXXX components across more than one page.
//
// The intention is to replace FctClient by FctClientHeadless.
//
class FctClientHeadless {
  constructor(contextChangeListener) {
    this.contextChangeListener = contextChangeListener;

    this.fctQuery = new FctQuery();
    this.serviceEndpoint = this.fctQuery.getDefaultServiceEndpoint();
    this.viewLimit = this.fctQuery.getDefaultViewLimit();

    // Override the FctJsClient defaults
    //
    // this.serviceEndpoint = DFLT_SERVICE_ENDPOINT;
    // this.fctQuery.setServiceEndpoint(this.serviceEndpoint);
    //
    // this.viewLimit = DFLT_VIEW_LIMIT;
    // this.fctQuery.setViewLimit(this.viewLimit);
    //
    // this.fctQuery.setViewType(DFLT_VIEW_TYPE);

    // viewLimit may be overridden in the UI.
    // TO DO: Add UI controls to allow setting of serviceEndpoint and describeEndpoint.

    this.state = {
      searchText: "",
      searchLabel: "",
      searchUri: "",
      fctResult: null,
      fctError: null,
      viewType: this.fctQuery.getViewType(),
      viewSubjectIndex: 1,
      tripleTerminology: "eav",   // spo | eav
    };

    this.fctUiUtil = new FctUiUtil(this.state.tripleTerminology);

    // Merge these handlers
    this.handleNewSearchRequest = this.handleNewSearchRequest.bind(this);
    this.handleChangeSearchEntityText = this.handleChangeSearchEntityText.bind(this);
    this.handleSearchOnEntityText = this.handleSearchOnEntityText.bind(this);
    this.handleChangeSearchEntityLabel = this.handleChangeSearchEntityLabel.bind(this);
    this.handleSearchOnEntityLabel = this.handleSearchOnEntityLabel.bind(this);
    this.handleChangeSearchEntityUri = this.handleChangeSearchEntityUri.bind(this);
    this.handleSearchOnEntityUri = this.handleSearchOnEntityUri.bind(this);

    this.handleViewListChange = this.handleViewListChange.bind(this);
    this.handleViewChange = this.handleViewChange.bind(this);
    this.handleSetSubjectFocus = this.handleSetSubjectFocus.bind(this);
    this.handleDropQueryFilter = this.handleDropQueryFilter.bind(this);
    this.handleRowLimitChange = this.handleRowLimitChange.bind(this);
  }

  // setState:
  // Provided because FctClientHeadless isn't a component.
  setState(state) {
    this.state = { ...this.state, ...state };
    this.contextChangeListener();
  }

  handleChangeSearchEntityText(searchText) {
    console.log('FctClientHeadless#handleChangeSearchEntityText: searchText:', searchText);
    this.setState({ searchText: searchText, fctError: null });
  }

  handleSearchOnEntityText(searchText) {
    searchText = searchText.trim();
    this.setState({ searchText: searchText }); // Async!

    if (!searchText) {
      this.setState({ fctResult: null, fctError: null });
    }
    else {
      this.fctQuery.setQueryText(searchText);
      this.search();
    }
  }

  handleChangeSearchEntityLabel(searchLabel) {
    console.log('FctClientHeadless#handleChangeSearchEntityLabel: searchLabel:', searchLabel);
    this.setState({ searchLabel: searchLabel, fctError: null });
  }

  handleSearchOnEntityLabel(searchLabel) {
    alert(`FctClientHeadless#handleSearchOnEntityLabel("${searchLabel}") - Not Implemented`);
  }

  handleChangeSearchEntityUri(searchUri) {
    console.log('FctClientHeadless#handleChangeSearchEntityUri: searchLabel:', searchUri);
    this.setState({ searchUri: searchUri, fctError: null });
  }

  handleSearchOnEntityUri(searchUri) {
    alert(`FctClientHeadless#handleSearchOnEntityUri("${searchUri}") - Not Implemented`);
  }

  handleNewSearchRequest() {
    this.setState({ searchText: "", searchLabel: "", searchUri: "", fctError: null });
  }

  search() {
    console.log('FctClientHeadless#search');
    if (!this.fctQuery.getQueryText())
      this.setState({ fctResult: null, fctError: null });
    else {
      this.fctQuery.execute()
        .then(qryResult => {
          console.log('FctClientHeadless#search: qryResult: ', qryResult);
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

  handleViewChange(viewType) {
    this.updateView(viewType);
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

  handleSetSubjectFocus(subjectId) {
    let newView = subjectId == 1 ? 'text-d' : 'list';
    this.fctQuery.setViewSubjectIndex(subjectId);
    this.setState({ viewSubjectIndex: subjectId, viewType: newView }); // Async!
    this.updateView(newView);
  }

  handleDropQueryFilter(filterId) {
    console.log('FctClientHeadless#handleDropQueryFilter: filterId:', filterId);
    this.fctQuery.removeQueryFilter(filterId); // May change the view type if the removed filter had the subject focus
    // If the removed filter was a <text> element, clear the searchInputEditor input to reflect this.
    if (!this.fctQuery.getQueryText())
      this.handleChangeSearchEntityText("");
    this.updateView(this.fctQuery.getViewType());
  }

  handleRowLimitChange(limit) {
    this.fctQuery.setViewLimit(limit);
    this.search();
  }

  // Performs a Facet action extracted from a query string.
  // A Facet action is one that manipulates the Facet service
  // input XML.
  // 
  // Subsequently, in updateView(), the new input XML is
  // submitted to the Facet service and the new search results handled.
  performFctAction(action) {
    console.log('FctClientHeadless#performFctAction: action:', action)
    switch (action.action.name) {
      case "setTextProperty":
        this.fctQuery.setQueryTextProperty(action.action.propertyIri);
        break;
      case "openProperty":
        // - Add filter: ?s[n] has the given property.
        //     e.g. ?s1 skiresorts:advanced_slopes ?s2
        // - Display a list of values (instances of values) for the property
        // Create XML element:
        // <property iri="{propertyURI}" [exclude="yes"]>
        //   <view type="list" limit="{limit}" offset="0" />
        // </property>
        let propSubjIndx = this.fctQuery.addProperty(
          action.action.propertyIri,
          this.fctQuery.getViewSubjectIndex(),
          action.action.excludeProperty
          // sameAs,
          // inferenceContext
        );
        this.fctQuery.setViewSubjectIndex(propSubjIndx);
        this.fctQuery.setViewType(action.viewType);
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
        let propOfSubjIndx = this.fctQuery.addPropertyOf(
          action.action.propertyIri,
          this.fctQuery.getViewSubjectIndex(),
          action.action.excludeProperty
          // sameAs,
          // inferenceContext
        );
        this.fctQuery.setViewSubjectIndex(propOfSubjIndx);
        this.fctQuery.setViewType(action.viewType);
        this.fctQuery.setViewOffset(0); // The existing view limit should be retained.
        break;
      case "cond":
        // Set a condition on a subject node
        // Create an XML <cond> element, e.g.:
        // <property iri="http://www.openlinksw.com/ski_resorts/schema#advanced_slopes">
        //   <cond type="eq" neg="" xml:lang="" datatype="http://www.w3.org/2001/XMLSchema#integer">27</cond>
        // </property>
        // After setting a condition, FctQuery#setSubjectCondition sets subject node to 1, 
        // the view type to 'text-d' and the view offset set to 0.
        this.fctQuery.setSubjectCondition(
          action.action.conditionType,
          action.action.value,
          action.action.valueDataType,
          action.action.valueLang,
          action.action.negate
        );
        break;
      case "setClass":
        // - Add filter: ?s[n] is an instance of the given class. 
        //     e.g. ?s1 is a skiresort:SkiResort 
        // Create XML element:
        // <class>
        this.fctQuery.setSubjectClass(action.action.classIri);
        this.fctQuery.setViewType(action.viewType);
        break;
    }
  }
}

export default FctClientHeadless;

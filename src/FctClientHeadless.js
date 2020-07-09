import { FctQuery, FctResult } from '../lib/facet-js-client.js';

const FCT_CLIENT_DFLT_VIEW_TYPE = "text";

// TO DO: Remove
// NOTE: NOT A COMPONENT
class FctClientHeadless {
  constructor(contextStateChangeListener) {
    this.contextStateChangeListener = contextStateChangeListener;
    
    this.state = {
      searchText: "",
      searchLabel: "",
      searchUri: "",
      fctResult: null,
      fctError: null,
      viewType: FCT_CLIENT_DFLT_VIEW_TYPE,
      viewSubjectIndex: 1,
      tripleTerminology: "eav",   // spo | eav
    };
    
    // viewLimit may be overridden in the UI.
    // TO DO: Add UI control and intialize to FctQuery default.
    // this.viewLimit = FctQuery.FCT_QRY_DFLT_VIEW_LIMIT; 
    this.viewLimit = 50; 
    // serviceEndpoint and describeEndpoint may be overridden in the UI.
    // TO DO: Add UI control and initialize to FctQuery defaults.
    this.serviceEndpoint = FctQuery.FCT_QRY_DFLT_SVC_ENDPOINT; 
    this.describeEndpoint = FctQuery.DESCRIBE_DFLT_SVC_ENDPOINT;

    this.fctQuery = new FctQuery();
    this.fctQuery.setViewType(FCT_CLIENT_DFLT_VIEW_TYPE);
    this.fctQuery.setServiceEndpoint(this.serviceEndpoint);
    this.fctQuery.setViewLimit(this.viewLimit);

    // Merge these handlers
    this.handleChangeSearchEntityText = this.handleChangeSearchEntityText.bind(this);
    this.handleSearchOnEntityText = this.handleSearchOnEntityText.bind(this);
    this.handleChangeSearchEntityLabel = this.handleChangeSearchEntityLabel.bind(this);
    this.handleSearchOnEntityLabel = this.handleSearchOnEntityLabel.bind(this);
    this.handleChangeSearchEntityUri = this.handleChangeSearchEntityUri.bind(this);
    this.handleSearchOnEntityUri = this.handleSearchOnEntityUri.bind(this);

    this.handleViewChange = this.handleViewChange.bind(this);
    this.handleSetSubjectFocus = this.handleSetSubjectFocus.bind(this);
    this.handleDropQueryFilter = this.handleDropQueryFilter.bind(this);
    this.handleRowLimitChange = this.handleRowLimitChange.bind(this);
  }

  // !!! NOTE !!!
  // Provided because FctClientHeadless isn't a component
  setState(state) {
    this.state = { ...this.state, ...state };
    this.contextStateChangeListener();
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
      this.fctQuery.queryText = searchText;
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

  search() {
    console.log('FctClientHeadless#search');
    if (!this.fctQuery.queryText)
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
  
  handleViewChange(event) {
    this.updateView(event.target.value);
  }

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
    this.fctQuery.removeQueryFilter(filterId); // May change the view type if the removed filter had the subject focus
    // If the removed filter was a <text> element, clear the searchInputEditor input to reflect this.
    if (!this.fctQuery.queryText)
      this.handleChangeSearchEntityText("");
    this.updateView(this.fctQuery.getViewType());
  }

  handleRowLimitChange(limit) {
    this.fctQuery.setViewLimit(limit);
    this.search();
  }

  componentDidUpdate(prevProps, prevState) {
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
      // updateView 
      // - optionally updates this.state.viewType
      // - updates any existing Facet search results 
      this.updateView(newView); 
    }
  }

  performUiAction() {
    switch (this.props.action.name) {
      case "setTextProperty": 
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
        let propSubjIndx = this.fctQuery.addProperty(
          this.props.action.propertyIri,
          this.fctQuery.getViewSubjectIndex(),
          this.props.action.excludeProperty
          // sameAs,
          // inferenceContext
          );
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
        let propOfSubjIndx = this.fctQuery.addPropertyOf(
          this.props.action.propertyIri,
          this.fctQuery.getViewSubjectIndex(),
          this.props.action.excludeProperty
          // sameAs,
          // inferenceContext
          );
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
        this.fctQuery.setViewType(this.props.viewType);
        break;
    }
  }
}

export default FctClientHeadless;

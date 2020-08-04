import React from 'react';
import qs from 'qs'
import SearchEntryPage from './pages/SearchEntryPage'
import SearchResultsPage from './pages/SearchResultsPage'
import AboutPage from './pages/AboutPage'
import HelpPage from './pages/HelpPage'
import { FctClientProvider } from './FctClientContext'
import FctClientHeadless from './FctClientHeadless'

export class FctClientFullUiController extends React.Component {

  constructor(props) {
    super(props);
    this.drawerToggleClickHandler = this.drawerToggleClickHandler.bind(this);
    this.backdropClickHandler = this.backdropClickHandler.bind(this);
    this.contextChangeListener = this.contextChangeListener.bind(this);

    this.fctClientContext = {
      fctClient: new FctClientHeadless(this.contextChangeListener),
    };

    this.state = {
      sideDrawerOpen: false,
      contextTimestamp: this.getNewTimestamp()
    };
  }

  getNewTimestamp() {
    return new Date().getTime();
  }

  contextChangeListener() {
    // We use a change of state on the Controller to trigger a render, 
    // rather than using a change of the context provider value.
    // The context provider just provides a reference to a FctClientHeadless
    // instance shared across pages. The reference itself doesn't change.
    this.setState({ contextTimestamp: this.getNewTimestamp() });
  }

  drawerToggleClickHandler(e) {
    if (e)
      e.preventDefault();
    this.setState((prevState) => {
      return { sideDrawerOpen: !prevState.sideDrawerOpen };
    });
  }

  backdropClickHandler(e) {
    this.setState({ sideDrawerOpen: false });
  }

  render() {
    let pageName = this.props.pageName;

    // Guard against client starting on /searchResults.
    if (pageName === "SearchResultsPage" && 
        (this.fctClientContext.fctClient.state.searchText || '').trim().length === 0)
    {
      pageName = "SearchEntryPage";
      this.props.history.push("/");
    }

    switch (pageName) {
      case "SearchEntryPage":
        return (
          <FctClientProvider value={this.fctClientContext}>
            <SearchEntryPage
              history={this.props.history}
              location={this.props.location}
              drawerToggleClickHandler={this.drawerToggleClickHandler}
              backdropClickHandler={this.backdropClickHandler}
              sideDrawerOpen={this.state.sideDrawerOpen}
            />
          </FctClientProvider>
        );
      case "SearchResultsPage":
        return (
          <>
          <FctClientProvider value={this.fctClientContext}>
            <SearchResultsPage
              history={this.props.history}
              location={this.props.location}
              drawerToggleClickHandler={this.drawerToggleClickHandler}
              backdropClickHandler={this.backdropClickHandler}
              sideDrawerOpen={this.state.sideDrawerOpen}
            />
          </FctClientProvider>
          </>
        );
      case "AboutPage":
        return (
          <FctClientProvider value={this.fctClientContext}>
            <AboutPage
              history={this.props.history}
              location={this.props.location}
              drawerToggleClickHandler={this.drawerToggleClickHandler}
              backdropClickHandler={this.backdropClickHandler}
              sideDrawerOpen={this.state.sideDrawerOpen}
            />
          </FctClientProvider>
        );
      case "HelpPage":
        return (
          <FctClientProvider value={this.fctClientContext}>
            <HelpPage
              history={this.props.history}
              location={this.props.location}
              drawerToggleClickHandler={this.drawerToggleClickHandler}
              backdropClickHandler={this.backdropClickHandler}
              sideDrawerOpen={this.state.sideDrawerOpen}
            />
          </FctClientProvider>
        );
      default:
        throw Error('Unknown page');
    }
  }

  /**
   * Identifies any Facet action contained in any query string.
   * These actions come from links in the UI.
   *
   * @param {object} qryStrParams - query string parameters obtained from qs.parse
   */
  getActionFromQueryString(qryStr) {
    // TO DO: Duplicated in FctClientMinUiController. Merge the two.
    let action;
    let qryStrParams;

    if (qryStr) {
      qryStrParams = qs.parse(qryStr, { ignoreQueryPrefix: true });
    }

    if (qryStrParams && qryStrParams.action) {
      action = {};

      // action.ts is used to force a refresh in FctClient#componentDidUpdate
      // when a link with the same href is followed on two different occasions
      // but with a completely different Facet input XML on each visit
      // to the link.
      // e.g. an 'any attribute' link:
      // /?action=setView&viewType=text-properties&...
      // could be followed on two separation occasions, between two searches using completely
      // different search text.

      switch (qryStrParams.action) {
        case "setView":
          console.log('FctClientFullUiController: Action: setView');
          // Example equivalent /fct link
          // View shows: ?s1 has <any Attribute> with Value "skiing" 
          // The <any Attribute> link is:
          // http://linkeddata.uriburner.com/fct/facet.vsp?
          //   cmd=set_view&
          //   type=text-properties&limit=20&offset=0&cno=0
          //   &sid=22
          action.viewType = qryStrParams.viewType;
          action.ts = this.getNewTimestamp();
          // TO DO: Act on limit, offset and cno query string params
          break;
        case "setTextProperty":
          console.log('FctClientFullUiController: Action: setTextProperty');
          // Example equivalent /fct link:
          // View shows: ?s1 has any Attribute with Value "skiing"
          // The href under the first attribute (http://www.openlinks.../schema#description) is:
          // http://linkeddata.uriburner.com/fct/facet.vsp?
          //   cmd=set_text_property&
          //   iri=http%3A%2F%2Fwww.openlinksw.com%2Fski_resorts%2Fschema%23description&
          //   lang=&datatype=uri&sid=22
          // Equivalent to /fct PL routine fct_set_text_property()
          //
          // Set Facet input XML as follows:
          // - Set <text> element attribute @property-iri to iri qs param.
          // - Set view type to text-d.
          action.viewType = 'text-d';
          action.action = {
            name: qryStrParams.action,
            propertyIri: qryStrParams.iri
          };
          action.ts = this.getNewTimestamp();
          break;
        case "openProperty":
          console.log('FctClientFullUiController: Action: openProperty');
          // Example equivalent /fct link:
          // View shows: ?s1 has [[any Attribute]] with Value "skiing"
          // Click on the above [[any Attribute]] link
          // Click on attribute skiresort:description
          // View shows: ?s1 has [[skiresort:description]] containing text "skiing"
          // Click on Attributes in the sidebar
          // The href under the attribute skiresort:advanced_slopes is:
          // http://linkeddata.uriburner.com/fct/facet.vsp?
          //   cmd=open_property&
          //   iri=http%3A%2F%2Fwww.openlinksw.com%2Fski_resorts%2Fschema%23advanced_slopes&
          //   lang=&datatype=uri&sid=732828
          // Equivalent to /fct PL routine fct_open_property(...,'property',)
          //
          // Example XML:
          // <?xml version="1.0" encoding="ISO-8859-1" ?>
          // <query inference="" invfp="IFP_OFF" same-as="SAME_AS_OFF" view3="" s-term="" c-term="" agg="" limit="20">
          //   <text property="http://www.openlinksw.com/ski_resorts/schema#description">skiing</text>
          //   <property iri="http://www.openlinksw.com/ski_resorts/schema#advanced_slopes">
          //     <view type="list" limit="20" offset="0" />
          //   </property>
          // </query>
          action.viewType = 'list';
          action.action = {
            name: qryStrParams.action,
            propertyIri: qryStrParams.iri,
            excludeProperty: false,         // TO DO: Retrieve from query string
          };
          action.ts = this.getNewTimestamp();
          break;
        case "openPropertyOf":
          console.log('FctClientFullUiController: Action: openPropertyOf');
          // Example equivalent /fct link:
          // View shows: ?s1 has [[any Attribute]] with Value "linked+data"
          // Click on Values in the sidebar
          // View shows: ?s1 is the Value of [[any Attribute]] where the Entity is associated with "linked+data"
          // The href under the attribute madeTweet is:
          // http://linkeddata.uriburner.com/fct/facet.vsp?
          //   cmd=open_property_of&
          //   iri=http%3A%2F%2Fwww.openlinksw.com%2Fschemas%2Ftwitter%23madeTweet&
          //   lang=&datatype=uri&sid=965838
          // Equivalent to /fct PL routine fct_open_property(...,'property-of',)
          action.viewType = 'list';
          action.action = {
            name: qryStrParams.action,
            propertyIri: qryStrParams.iri,
            excludeProperty: false,         // TO DO: Retrieve from query string
          };
          action.ts = this.getNewTimestamp();
          break;
        case "cond":
          console.log('FctClientFullUiController: Action: cond');
          // Example equivalent /fct link:
          // http://linkeddata.uriburner.com/fct/facet.vsp?
          //   cmd=cond&cond_t=eq&val=2&lang=&
          //   datatype=http%3A%2F%2Fwww.w3.org%2F2001%2FXMLSchema%23integer&sid=883402
          // Equivalent to /fct PL routines:
          // fct_set_cond(), fct_set_cond_in(), fct_set_cond_near(), fct_set_cond_range()
          switch (qryStrParams.cond_t) {
            case "eq":
            case "neq":
            case "gt":
            case "gte":
            case "lt":
            case "lte":
              action.viewType = 'text-d';
              action.action = {
                name: qryStrParams.action,
                conditionType: qryStrParams.cond_t,
                value: qryStrParams.val,
                valueDataType: qryStrParams.dataType,
                valueLang: qryStrParams.lang,
                negate: (qryStrParams.neg ? true : false)
              };
              action.ts = this.getNewTimestamp();
              break;
            case "in":
            case "not_in":
            case "range":
            case "neg_range":
            case "near":
              throw new Error("Condition type (cond_t) not yet implemented:", qryStrParams.cond_t);
            default:
              throw new Error("Unrecognized condition type (cond_t):", qryStrParams.cond_t);
          }
          break;
        case "setClass":
          console.log('FctClientFullUiController: Action: setClass');
          // Example equivalent /fct link
          // http://linkeddata.uriburner.com/fct/facet.vsp?
          //   cmd=set_class&
          //   iri=http%3A%2F%2Fwww.openlinksw.com%2Fski_resorts%2Fschema%23SkiResort&
          //   lang=&datatype=uri&sid=901795
          action.viewType = 'text-d';
          action.action = {
            name: qryStrParams.action,
            classIri: qryStrParams.iri,
            // dataType,
            // lang
          };
          action.ts = this.getNewTimestamp();
          break;
        default:
          throw new Error("Unrecognized action:", qryStrParams.action);
      }
    }
    return action;
  }

  componentDidUpdate(prevProps, prevState) {
    // Check for a pending Facet action to be performed.
    // We can't do this in render(), as render() can't trigger a state change.
    let action = this.getActionFromQueryString(this.props.location.search);
    if (action) {
      console.log('FctClientFullUiController#componentDidUpdate: #action:', action);
      this.fctClientContext.fctClient.performFctAction(action);
      this.fctClientContext.fctClient.updateView(action.viewType);

      // Any action found in the query string has now been processed.
      // Remove the query string so it doesn't persist across renders.
      //
      // If we don't remove the action here, we must rely on action.ts
      // to differentiate new and old actions. 
      let newLocation = { ...this.props.location, ...{ search: "" } };
      this.props.history.replace(this.props.location.pathname, newLocation);
    }
  }
}

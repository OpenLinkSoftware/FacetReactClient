import React from 'react';
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
      ts: this.getNewTimestamp()
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
    this.setState({ts: this.getNewTimestamp()});
  }

  drawerToggleClickHandler(e) {
    e.preventDefault();
    this.setState((prevState) => {
      return { sideDrawerOpen: !prevState.sideDrawerOpen };
    });
  }

  backdropClickHandler(e) {
    this.setState({ sideDrawerOpen: false });
  }

  render() {
    const pageName = this.props.pageName;
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
          <FctClientProvider value={this.fctClientContext}>
            <SearchResultsPage
              history={this.props.history}
              location={this.props.location}
              drawerToggleClickHandler={this.drawerToggleClickHandler}
              backdropClickHandler={this.backdropClickHandler}
              sideDrawerOpen={this.state.sideDrawerOpen}
            />
          </FctClientProvider>
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

}
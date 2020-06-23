import React from 'react';
import { Route, Switch } from 'react-router-dom'
import PlainComponentsPage from './pages/PlainComponentsPage'
import SearchEntryPage from './pages/SearchEntryPage'
import SearchResultsPage from './pages/SearchResultsPage'
import AboutPage from './pages/AboutPage'
import HelpPage from './pages/HelpPage'

class App extends React.Component {
  constructor(props) {
    super(props);
    // props: { title, ... }

    this.state = { sideDrawerOpen: false };
    this.drawerToggleClickHandler = this.drawerToggleClickHandler.bind(this);
    this.backdropClickHandler = this.backdropClickHandler.bind(this);
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
    return (
      <Switch>
        <Route path="/plain_components" component={PlainComponentsPage} exact={true} />
        <Route
          path="/"
          exact={true}
          render={(props) => <SearchEntryPage
            history={props.history}
            drawerToggleClickHandler={this.drawerToggleClickHandler}
            backdropClickHandler={this.backdropClickHandler}
            sideDrawerOpen={this.state.sideDrawerOpen}
          />}
        />
        <Route
          path="/searchResults"
          render={(props) => <SearchResultsPage
            drawerToggleClickHandler={this.drawerToggleClickHandler}
            backdropClickHandler={this.backdropClickHandler}
            sideDrawerOpen={this.state.sideDrawerOpen}
          />}
        />
        <Route
          path="/about"
          render={(props) => <AboutPage
            drawerToggleClickHandler={this.drawerToggleClickHandler}
            backdropClickHandler={this.backdropClickHandler}
            sideDrawerOpen={this.state.sideDrawerOpen}
          />}
        />
        <Route
          path="/help"
          render={(props) => <HelpPage
            drawerToggleClickHandler={this.drawerToggleClickHandler}
            backdropClickHandler={this.backdropClickHandler}
            sideDrawerOpen={this.state.sideDrawerOpen}
          />}
        />
      </Switch>
    );
  }

}

export default App;

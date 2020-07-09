import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { FctClientFullUiController } from './FctClientFullUiController';
import { FctClientMinUiController } from './FctClientMinUiController';

class App extends React.Component {
  constructor(props) {
    super(props);
    // props: { title, ... }
  }

  render() {
    return (
      <Switch>
        <Route path="/plain_components"
          component={FctClientMinUiController}
          exact={true}
        />
        <Route
          path="/"
          exact={true}
          render={(props) => <FctClientFullUiController
            pageName='SearchEntryPage'
            history={props.history}
          />}
        />
        <Route
          path="/searchResults"
          render={(props) => <FctClientFullUiController
            pageName='SearchResultsPage'
            history={props.history}
          />}
        />
        <Route
          path="/about"
          render={(props) => <FctClientFullUiController
            pageName='AboutPage'
            history={props.history}
          />}
        />
        <Route
          path="/help"
          render={(props) => <FctClientFullUiController
            pageName='HelpPage'
            history={props.history}
          />}
        />
      </Switch>
    );
  }

}

export default App;

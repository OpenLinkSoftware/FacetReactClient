import React from 'react';
import { Route, Switch } from 'react-router-dom'
import MainPage from './pages/MainPage'
import SearchEntryPage from './pages/SearchEntryPage'
import SearchResultsPage from './pages/SearchResultsPage'
import AboutPage from './pages/AboutPage'
import HelpPage from './pages/HelpPage'

const App = ({title}) => {
  return (
      <Switch>
        <Route path="/" component={MainPage} exact={true} />
        <Route 
          path="/searchEntry" 
          render={(props) => <SearchEntryPage history={props.history}/>} 
        />
        <Route path="/searchResults" component={SearchResultsPage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/help" component={HelpPage} />
      </Switch>
  );
};

export default App;

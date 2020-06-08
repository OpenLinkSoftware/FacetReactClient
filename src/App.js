import React from 'react';
import { Route, Switch } from 'react-router-dom'
import MainPage from './pages/MainPage'
import Mockup from './pages/Mockup'

const App = ({title}) => {
  return (
      <Switch>
        <Route path="/" component={MainPage} exact={true} />
        <Route path="/mockup" component={Mockup} />
      </Switch>
  );
};

export default App;

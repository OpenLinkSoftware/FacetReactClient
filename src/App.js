import React from 'react';
import { Route, Switch } from 'react-router-dom'
import MainPage from './pages/MainPage'

const App = ({title}) => {
  return (
    <Switch>
      <Route path="/" component={MainPage} />
    </Switch>
  );
};

export default App;

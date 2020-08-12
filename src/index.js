import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { fctConfig } from './FctConfig';
import './css/facet.css';
import './css/sidebar.css';

import App from './App';

const title = 'Facet React Client - Bare Component List';

ReactDOM.render(
  
  <BrowserRouter basename={fctConfig.deploymentBasePath}>
    <App title={title} />
  </BrowserRouter>,
  document.getElementById('app')
);

module.hot.accept();

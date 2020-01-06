import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

const title = 'Facet React Client - Bare Component List';

ReactDOM.render(
  <App title={title} />,
  document.getElementById('app')
);

module.hot.accept();

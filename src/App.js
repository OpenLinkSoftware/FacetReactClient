import React from 'react';

import FctClient from './FctClient';

const App = ({title}) => {
  return (
    <div>
      <h2>{title}</h2>
      <FctClient />
    </div>
  );
};

export default App;

import React from 'react';

const backdrop = props => (
  <div className="backdrop" onClick={props.clickHndlr} />
);

export default backdrop;
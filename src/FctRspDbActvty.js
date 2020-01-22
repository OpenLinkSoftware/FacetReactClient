// A component to display the <fct:db-activity> element of a Facet service response.

import React from 'react';

class FctRspDbActvty extends React.Component {

  constructor(props) {
    super(props);
    this.state = { dbActivity: props.dbActivity }; // FIX ME! ANTIPATTERN! See https://reactjs.org/docs/react-component.html
  }

  render() {
    return ( <div>{this.state.dbActivity}</div> );
  }

  static getDerivedStateFromProps(props, state) {
    return { dbActivity: props.dbActivity }
  }

}


export { FctRspDbActvty as default };

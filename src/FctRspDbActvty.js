// A component to display the <fct:db-activity> element of a Facet service response.

import React from 'react';

class FctRspDbActvty extends React.Component {

//  constructor(props) {
//    super(props);
//  }

  render() {
    return ( <div><small>Resource utilization: {this.props.dbActivity}</small></div> );
  }

}

export { FctRspDbActvty as default };

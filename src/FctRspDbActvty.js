// A component to display the <fct:db-activity> element of a Facet service response.

import React from 'react';

class FctRspDbActvty extends React.Component {

//  constructor(props) {
//    super(props);
//  }

  render() {
    return ( <div>{this.props.dbActivity}</div> );
  }

}

export { FctRspDbActvty as default };

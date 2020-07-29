import React from 'react';
import FctNavBar from '../FctNavBar'
import FctFooter from '../FctFooter'
import FctSideDrawer from '../FctSideDrawer';
import Backdrop from '../Backdrop';

import FctClientContext from '../FctClientContext';

export default class HelpPage extends React.Component {
  // TO DO: Newer syntax:
  // static contextType = FctClientContext;

  render() {

    let backdrop;
    if (this.props.sideDrawerOpen) {
      backdrop = <Backdrop clickHndlr={this.props.backdropClickHandler} />;
    }

    return (
      <div style={{ height: '100%' }}>
        <FctNavBar drawerToggleClickHandler={this.props.drawerToggleClickHandler} />
        <FctSideDrawer show={this.props.sideDrawerOpen} />
        {backdrop}
        <div className="container-fluid">
          <h2>Help</h2>
          <FctFooter />
        </div>
      </div>
    )
  }
}

HelpPage.contextType = FctClientContext;


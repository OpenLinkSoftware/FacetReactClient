import React from 'react';
import FctNavBar from '../FctNavBar'
import FctFooter from '../FctFooter'
import FctSideDrawer from '../FctSideDrawer';
import Backdrop from '../Backdrop';

export default class HelpPage extends React.Component {
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
          <h3>Help</h3>
          <FctFooter />
        </div>
      </div>
    )
  }
}

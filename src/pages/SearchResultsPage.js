import React from 'react';
import FctNavBar from '../FctNavBar';
import FctFooter from '../FctFooter';
import FctSideDrawer from '../FctSideDrawer';
import Backdrop from '../Backdrop';

export default class SearchResultsPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = { sideDrawerOpen: false };
    this.drawerToggleClickHandler = this.drawerToggleClickHandler.bind(this);
    this.backdropClickHandler = this.backdropClickHandler.bind(this);
  }

  drawerToggleClickHandler(e) {
    e.preventDefault();
    this.setState((prevState) => {
      return { sideDrawerOpen: !prevState.sideDrawerOpen };
    });
  }

  backdropClickHandler(e) {
    this.setState({ sideDrawerOpen: false });
  }


  render() {
    let backdrop;

    if (this.state.sideDrawerOpen) {
      backdrop = <Backdrop clickHndlr={this.backdropClickHandler}/>;
    }

    console.log('SearchResultsPage: render')
    return (
      <div style={{ height: '100%' }}>
        <FctNavBar drawerToggleClickHandler={this.drawerToggleClickHandler} />
        <FctSideDrawer show={this.state.sideDrawerOpen} />
        {backdrop}
        <div className="container-fluid">
          <h3>Search Results Page</h3>
          <FctFooter />
        </div>
      </div>
    )
  }

}

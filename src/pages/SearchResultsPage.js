import React from 'react';
import FctNavBar from '../FctNavBar';
import FctFooter from '../FctFooter';
import FctSideDrawer from '../FctSideDrawer';
import Backdrop from '../Backdrop';

import FctClientContext from '../FctClientContext';

import FctRspDbActvty from '../FctRspDbActvty';

const componentContainerStyle = {
  padding: '5px',
  border: 'solid 2px lightgray',
  marginBottom: '5px'
}

export default class SearchResultsPage extends React.Component {
  // TO DO: Newer syntax:
  // static contextType = FctClientContext;

  render() {
    let backdrop;

    if (this.props.sideDrawerOpen) {
      backdrop = <Backdrop clickHndlr={this.props.backdropClickHandler} />;
    }

    const fctClient = this.context.fctClient;
    const dbActivity = fctClient.state.fctResult ? fctClient.state.fctResult.json.facets["db-activity"] : '';

    return (
      <div style={{ height: '100%' }}>
        <FctNavBar drawerToggleClickHandler={this.props.drawerToggleClickHandler} />
        <FctSideDrawer show={this.props.sideDrawerOpen} />
        {backdrop}
        <div className="container-fluid">
          <h3>Search Results Page</h3>
          <div className="row">
            <div className="col-sm-12">
              <div>Component: FctRspDbActivity</div>
              <div style={componentContainerStyle}>
                <FctRspDbActvty dbActivity={dbActivity} />
              </div>
            </div>
          </div>

          <FctFooter />
        </div>
      </div>
    )
  }

}

SearchResultsPage.contextType = FctClientContext;

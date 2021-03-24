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

    let side_drawer_is_static = this.props.staticSideDrawer;

    return (
      <div style={{ height: '100%' }}>
        <FctNavBar
          drawerToggleClickHandler={this.props.drawerToggleClickHandler}
          sideDrawerOpen={this.props.sideDrawerOpen}
          staticSideDrawer={this.props.staticSideDrawer}
        />
        <FctSideDrawer
          show={this.props.sideDrawerOpen}
          drawerPinClickHandler={this.props.drawerPinClickHandler}
          staticSideDrawer={this.props.staticSideDrawer}
          currentPageName="HelpPage" />
        {backdrop}
        <div className="container-fluid">
          <div className="row">
            {side_drawer_is_static &&
              <div className="side-drawer-static-spacer"></div>
            }
            <div className="col mt-4 mb-3">
              <h2>Facet Help</h2>
              <h4>FAQ</h4>
              <p>
                Ifway ouyay otedvay orfay Exitbray, ouryay optimismway ightmay ebay averingway
                ightray ownay. Iway ancay oposepray ustjay ethay emedyray: Avidday Ameroncay’say
                emoirmay. Itway isway, unintentionallyway, ethay ostmay onvincingcay asecay orfay
                Exitbray atthay ouyay illway everway eadray.
              </p>
              <p>
                Orfay Ethay Ecordray asway ittenwray asway oliticalpay agedytray , away 700-agepay
                apologyway otay ethay ationnay orfay ethay ormerfay imepray inistermay’say oleray
                inway atwhay ehay egardsray asway away alamitycay.
              </p>
            </div>
          </div>
          <div className="row justify-content-center">
            {side_drawer_is_static &&
              <div className="side-drawer-static-spacer"></div>
            }
            <div className="flex-grow-1">
              <FctFooter />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

HelpPage.contextType = FctClientContext;


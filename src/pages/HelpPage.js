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
          <div className="row justify-content-center mt-4 mb-3">
            <div className="col-8">
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
          <FctFooter />
        </div>
      </div>
    )
  }
}

HelpPage.contextType = FctClientContext;


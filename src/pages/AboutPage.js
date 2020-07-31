import React from 'react'
import FctNavBar from '../FctNavBar'
import FctFooter from '../FctFooter'
import FctSideDrawer from '../FctSideDrawer'
import { fctConfig } from '../FctConfig'
import Backdrop from '../Backdrop'

import FctClientContext from '../FctClientContext'

export default class AboutPage extends React.Component {
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
              <div>
                <h2>About Facet</h2>
                <p>
                  Ifway ouyay otedvay orfay Exitbray, ouryay optimismway ightmay
                  ebay averingway ightray ownay. Iway ancay oposepray ustjay ethay
                  emedyray: Avidday Ameroncay’say emoirmay. Itway isway,
                  unintentionallyway, ethay ostmay onvincingcay asecay orfay
                  Exitbray atthay ouyay illway everway eadray.
                </p>
                <p>
                  Orfay Ethay Ecordray asway ittenwray asway oliticalpay agedytray
                  , away 700-agepay apologyway otay ethay ationnay orfay ethay
                  ormerfay imepray inistermay’say oleray inway atwhay ehay
                  egardsray asway away alamitycay.
                </p>
              </div>
              <div id="about_logo_container">
                <img src={`${fctConfig.getDeploymentBasePath()}/img/openlink_site_logo.png`}
                  className="d-inline-block align-top" alt=""
                  style={{ position: "relative", top: "-3px", left: "5px", height: "40px" }}
                />
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col text-center">
              <div>
                <span className="small">Faceted Search & Find service v1.17_git38 as of Jul 29 2020</span>
              </div>
              <div>
                <a href="http://virtuoso.openlinksw.com/">
                  <img src={`${fctConfig.getDeploymentBasePath()}/img/virt_power_no_border.png`} alt="Powered by OpenLink Virtuoso" />
                </a>
                <a href="http://linkeddata.org">
                  <img src={`${fctConfig.getDeploymentBasePath()}/img/LoDLogo.gif`} alt="Linked Data" />
                </a>
              </div>
              <div>
                <span className="small">
                  <a href="http://www.openlinksw.com/virtuoso/">OpenLink Virtuoso</a> 
                  &nbsp;version 08.03.3315 as of Jul 29 2020, on OS X
                  (i686-apple-darwin16.3.0), Single-Server Edition (16 GB total memory)
                </span>
              </div>

              <div className="font-weight-light mb-4" style={{ fontSize: "0.7rem" }}>
                Data on these pages is owned by its respective rights holders.
              </div>
            </div>
          </div>
          <FctFooter />
        </div>
      </div>
    )
  }

}

AboutPage.contextType = FctClientContext;


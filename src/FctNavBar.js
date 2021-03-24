import React from 'react'
import { Link } from 'react-router-dom'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import { FctClientConsumer } from './FctClientContext'
import { fctConfig } from './FctConfig'

export default class FctNavBar extends React.Component {
  constructor(props) {
    super(props);
    this.drawerToggleClickHndlr = this.drawerToggleClickHndlr.bind(this);
  }

  drawerToggleClickHndlr(e) {
    this.props.drawerToggleClickHandler(e);
  }

  render() {
    let sidebarToggleIcon = this.props.sideDrawerOpen ? 'oi oi-collapse-left' : 'oi oi-expand-left';
    let sidebarToggleIconColour = this.props.staticSideDrawer ? '#999' : '#fff'; // = enabled : disabled

    return (
      <nav className="navbar navbar-expand-lg navbar-dark opl-navbar-background">
        {/* 
        <Link className="navbar-brand" to="https://www.flaticon.com/authors/freepik">
          <img src={`${fctConfig.getDeploymentBasePath()}/img/diamond.svg`} className="d-inline-block align-top" alt="diamond logo" height="35" />
        </Link> 
        */}
        <img
          src={`${fctConfig.getDeploymentBasePath()}/img/diamond.svg`}
          className="d-inline-block align-top"
          alt="diamond logo" height="35"
          style={{ paddingRight: "15px" }}
        />
        <h2>Facet</h2>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <FctClientConsumer>
                {
                  // See https://stackoverflow.com/questions/41030361/how-to-update-react-context-from-inside-a-child-component
                  ({ fctClient }) =>
                  (
                    <OverlayTrigger
                      placement={'bottom'}
                      overlay={<Tooltip>New search</Tooltip>}
                    >
                      <Link
                        className="nav-link" to="/"
                        onClick={() => fctClient.handleNewSearchRequest()}
                      >
                        <span className="oi oi-magnifying-glass" style={{ color: 'white' }}></span>
                      </Link>
                    </OverlayTrigger>
                  )
                }
              </FctClientConsumer>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">About</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/help">Help</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/plain_components">Minimal UI</Link>
            </li>
          </ul>

          <ul className="navbar-nav">
            <li className="nav-item">
              <OverlayTrigger
                placement={'left'}
                overlay={<Tooltip>Login</Tooltip>}
              >
                <Link className="nav-link active" to="#" title="Login">
                  <span className="oi oi-account-login" aria-hidden="true"></span></Link>
              </OverlayTrigger>
            </li>
            <li className="nav-item" style={{ display: 'none' }}>
              <OverlayTrigger
                placement={'left'}
                overlay={<Tooltip>Logout</Tooltip>}
              >
                <Link className="nav-link active" to="#">
                  <span className="oi oi-account-logout" title="Logout" aria-hidden="true">
                  </span></Link>
              </OverlayTrigger>

            </li>
          </ul>
          <OverlayTrigger
            placement={'left'}
            overlay={<Tooltip>Settings / Filters</Tooltip>}
          >
            <button type="button" className="btn btn-default shadow-none" id="sidebarToggle" onClick={this.drawerToggleClickHndlr} >
              <span className={sidebarToggleIcon} aria-hidden="true" style={{ color: sidebarToggleIconColour }}></span>
            </button>
          </OverlayTrigger>

        </div>
      </nav>
    )
  }
}

import React from 'react'
import { Link } from 'react-router-dom'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'

export default class FctNavBar extends React.Component {
  constructor(props) {
    super(props);
    this.drawerToggleClickHndlr = this.drawerToggleClickHndlr.bind(this);
  }

  drawerToggleClickHndlr(e) {
    this.props.drawerToggleClickHandler(e);
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark opl-navbar-background">
        <Link className="navbar-brand" to="https://www.flaticon.com/authors/freepik">
          <img src="./img/diamond.svg" className="d-inline-block align-top" alt="diamond logo" height="35" />
        </Link>
        <h2>Facet</h2>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
            <OverlayTrigger
                placement={'bottom'}
                overlay={<Tooltip>New search</Tooltip>}
              >
              <Link className="nav-link" to="/"><span
                className="oi oi-magnifying-glass" style={{ color: 'white' }}></span></Link>
                            </OverlayTrigger>

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
                  <span className="oi oi-account-login" style={{ position: 'relative', top: '-2px' }} aria-hidden="true"></span></Link>
              </OverlayTrigger>
            </li>
            <li className="nav-item" style={{ display: 'none' }}>
              <OverlayTrigger
                placement={'left'}
                overlay={<Tooltip>Logout</Tooltip>}
              >
                <Link className="nav-link active" to="#">
                  <span className="oi oi-account-logout" title="Logout" style={{ position: 'relative', top: '-2px' }} aria-hidden="true">
                  </span></Link>
              </OverlayTrigger>

            </li>
          </ul>
          <OverlayTrigger
                placement={'left'}
                overlay={<Tooltip>Settings</Tooltip>}
              >
          <button type="button" className="btn btn-default shadow-none" id="sidebarToggle" onClick={this.drawerToggleClickHndlr} >
            <span className="oi oi-cog" aria-hidden="true"></span>
          </button>
          </OverlayTrigger>
        </div>
      </nav>
    )
  }
}

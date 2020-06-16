import React, { Component } from 'react'
import { Link } from 'react-router-dom'


export default function FctNavBar () {
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
            <Link className="nav-link" to="/searchEntry" title="New Search" data-toggle="tooltip" data-placement="bottom"><span
              className="oi oi-magnifying-glass" style={{ color: 'white' }}></span></Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/about">About</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/help">Help</Link>
          </li>
        </ul>

        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link active" to="#" title="Login">
              <span className="oi oi-account-login" style={{ position: 'relative', top: '-2px' }} title="Login" aria-hidden="true"
                data-toggle="tooltip" data-placement="left"></span></Link>
          </li>
          <li className="nav-item" style={{ display: 'none' }}>
            <Link className="nav-link active" to="#">
              <span className="oi oi-account-logout" title="Logout" style={{ position: 'relative', top: '-2px' }} aria-hidden="true"
                data-toggle="tooltip" data-placement="left"></span></Link>
          </li>
        </ul>
        <button type="button" className="btn btn-default shadow-none" id="sidebarToggle">
          <span className="oi oi-cog" title="Settings" aria-hidden="true" data-toggle="tooltip" data-placement="left"></span>
        </button>
      </div>
    </nav>
  )
}
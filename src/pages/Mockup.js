import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Popover from 'react-bootstrap/Popover'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Button from 'react-bootstrap/Button'

// import FctClient from '../FctClient';

// Scratchpad page for merging static mockup of reworked Facet UI into Facet React Client

const OpenSearchLinkAndPopover = () => {
  return (
    <OverlayTrigger trigger="click" placement='bottom' 
      overlay={
        <Popover id="popover-basic">
          <Popover.Title>OpenSearch</Popover.Title>
          <Popover.Content>
            You can <a href='http://linkeddata.uriburner.com/fct/#'>add this engine</a> in the search bar of an OpenSearch-capable browser"
          </Popover.Content>
        </Popover>
      }
    >
    <Link to="#" className="btn btn-outline-secondary" role="button">
      <img src="img/opensearch.svg" height="16" width="16" style={{position: "relative", top: "-2px"}}/>
    </Link>
  </OverlayTrigger>
);
  };

export default function Mockup() {
  return (
    <div id="content">
      <nav className="navbar navbar-expand-lg navbar-dark opl-navbar-background">
        <Link className="navbar-brand" to="https://www.flaticon.com/authors/freepik">
          <img src="./img/diamond.svg" className="d-inline-block align-top" alt="diamond logo" height="35"/>
        </Link>
        <h2>Facet</h2>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link className="nav-link" to="index.html" title="New Search" data-toggle="tooltip" data-placement="bottom"><span
                  className="oi oi-magnifying-glass" style={{color: 'white'}}></span></Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="about.html">About</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="help.html">Help</Link>
            </li>
          </ul>

          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link active" to="#" title="Login">
                <span className="oi oi-account-login" style={{position: 'relative', top: '-2px'}} title="Login" aria-hidden="true"
                  data-toggle="tooltip" data-placement="left"></span></Link>
            </li>
            <li className="nav-item" style={{display: 'none'}}>
              <Link className="nav-link active" to="#">
                <span className="oi oi-account-logout" title="Logout" style={{position: 'relative', top: '-2px'}} aria-hidden="true"
                data-toggle="tooltip" data-placement="left"></span></Link>
            </li>
          </ul>
          <button type="button" className="btn btn-default shadow-none" id="sidebarToggle">
            <span className="oi oi-cog" title="Settings" aria-hidden="true" data-toggle="tooltip" data-placement="left"></span>
          </button>
        </div>
      </nav>
    
      <div className="container-fluid">
        <div className="container-fluid">
          <div className="row">
            <div className="col text-right pt-2">
              <Link to="#" className="btn btn-outline-secondary" role="button">Featured</Link>
              <Link to="#" className="btn btn-outline-secondary" role="button">Demo Queries</Link>
              <OpenSearchLinkAndPopover/>
            </div>
          </div>
          <div className="row justify-content-center mt-3 mb-3">
            <h4>Precision Search &amp; Find</h4>
          </div>
        </div>
      </div>

    </div>
  )
}
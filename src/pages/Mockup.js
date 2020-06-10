import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Popover from 'react-bootstrap/Popover'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Button from 'react-bootstrap/Button'
import Nav from 'react-bootstrap/Nav'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

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

          {/* ------------------------------- */}

          <Tabs defaultActiveKey="entityText" id="uncontrolled-tab-example" className="justify-content-center">
            <Tab eventKey="entityText" title="rbEntity Text">
              <Row>
                <Col md={{span: 6, offset: 3}}>
                  <Form>
                    <Form.Group controlId="frmSearchText">
                      <Form.Row>
                        <Col>
                          <Form.Control type="text" placeholder="Search text"/>
                        </Col>
                        <Col md="auto">
                          <Button variant="primary" type="submit">Search</Button>
                        </Col>
                      </Form.Row>
                    </Form.Group>
                  </Form>
                </Col>
              </Row>
            </Tab>
            <Tab eventKey="entityLabel" title="rbEntity Label Lookup">
              <p>ENTITY LABEL!</p>
            </Tab>
            <Tab eventKey="entityURI" title="rbEntity URI Lookup">
              <p>ENTITY URI!</p>
            </Tab>
          </Tabs>

          {/* ------------------------------- */}

          <ul className="nav nav-tabs justify-content-center" id="tabSearchType" role="tablist">
            <li className="nav-item">
              <a className="nav-link active" href="#textPane" 
                id="tabTextSearch" data-toggle="tab" role="tab" aria-controls="entityText" aria-selected="true">bEntity Text</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#labelPane" 
                id="tabEntityLabelSearch" data-toggle="tab" role="tab" aria-controls="entityLabel" aria-selected="false">bEntity Label Lookup</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#uriPane" id="tabEntityUriSearch" 
                data-toggle="tab" role="tab" aria-controls="entityUri" aria-selected="false">bEntity URI Lookup</a>
            </li>
          </ul>

          {/* ------------------------------- */}

          <div className="tab-content" id="searchTabsContent">

            <div className="tab-pane fade show active" id="textPane" role="tabpanel" aria-labelledby="text-pane-tab">
              <div className="row justify-content-center my-3">
                <form className="form-inline">
                  <div className="col" style={{textAlign: "center"}}>
                    <input type="text" className="form-control" size="50" id="searchText1" name="searchText" placeholder="Search text"/>
                    <a className="btn btn-primary" href="./entities.html" role="button">Search</a>
                  </div>
                </form>
              </div>
            </div>

            <div className="tab-pane fade" id="labelPane" role="tabpanel" aria-labelledby="label-pane-tab">
              <div className="row justify-content-center my-3">
                <form className="form-inline">
                  <div className="col" style={{textAlign: "center"}}>
                    <input type="text" className="form-control" size="50" id="searchText2" name="searchText" placeholder="Label"/>
                    <a className="btn btn-primary" href="./entities.html" role="button">Describe</a>
                  </div>
                </form>
              </div>
            </div>

            <div className="tab-pane fade" id="uriPane" role="tabpanel" aria-labelledby="uri-pane-tab">
              <div className="row justify-content-center my-3">
                <form className="form-inline">
                  <div className="col" style={{textAlign: "center"}}>
                    <input type="text" className="form-control" size="50" id="searchText3" name="searchText" placeholder="URI"/>
                    <a className="btn btn-primary" href="./entities.html" role="button">Describe</a>
                  </div>
                </form>
              </div>
            </div>

          </div> {/* searchTabsContent */}

          {/* ------------------------------- */}
    
        </div> {/* container-fluid */}
      </div> {/* container-fluid */}

    </div>
  )
}
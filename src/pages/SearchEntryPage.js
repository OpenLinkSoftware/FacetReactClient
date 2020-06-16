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

import FctNavBar from '../FctNavBar'
import FctFooter from '../FctFooter'

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
        <img src="img/opensearch.svg" height="16" width="16" style={{ position: "relative", top: "-2px" }} />
      </Link>
    </OverlayTrigger>
  );
};

export default function SearchEntryPage(props) {

  const handleSearchEntityText = (e) => {
    e.preventDefault();
    props.history.push('/searchResults')
  };

  const handleSearchEntityLabel = (e) => {
    e.preventDefault();
    props.history.push('/searchResults')
  };

  const handleSearchEntityUri = (e) => {
    e.preventDefault();
    props.history.push('/searchResults')
  };

  return (
    <div id="content">
      <FctNavBar />
      <div className="container-fluid">
        <div className="container-fluid">
          <div className="row">
            <div className="col text-right pt-2">
              <Link to="#" className="btn btn-outline-secondary" role="button">Featured</Link>
              <Link to="#" className="btn btn-outline-secondary" role="button">Demo Queries</Link>
              <OpenSearchLinkAndPopover />
            </div>
          </div>
          <div className="row justify-content-center mt-3 mb-3">
            <h4>Precision Search &amp; Find</h4>
          </div>

          <Tabs defaultActiveKey="entityText" id="searchInputTabs" className="justify-content-center">
            <Tab eventKey="entityText" title="Entity Text">
              <Row>
                <Col md={{ span: 6, offset: 3 }} className="opl-search-tab-content">
                  <Form>
                    <Form.Group controlId="frmSearchText">
                      <Form.Row>
                        <Col>
                          <Form.Control type="text" placeholder="Search text" />
                        </Col>
                        <Col md="auto">
                          <Button variant="primary" type="submit" onClick={handleSearchEntityText}>Search</Button>
                        </Col>
                      </Form.Row>
                    </Form.Group>
                  </Form>
                </Col>
              </Row>
            </Tab>
            <Tab eventKey="entityLabel" title="Entity Label Lookup">
              <Row>
                <Col md={{ span: 6, offset: 3 }} className="opl-search-tab-content">
                  <Form>
                    <Form.Group controlId="frmSearchLabel">
                      <Form.Row>
                        <Col>
                          <Form.Control type="text" placeholder="Label" />
                        </Col>
                        <Col md="auto">
                          <Button variant="primary" type="submit" onClick={handleSearchEntityLabel}>Describe</Button>
                        </Col>
                      </Form.Row>
                    </Form.Group>
                  </Form>
                </Col>
              </Row>
            </Tab>
            <Tab eventKey="entityURI" title="Entity URI Lookup">
              <Row>
                <Col md={{ span: 6, offset: 3 }} className="opl-search-tab-content">
                  <Form>
                    <Form.Group controlId="frmSearchURI">
                      <Form.Row>
                        <Col>
                          <Form.Control type="text" placeholder="URI" />
                        </Col>
                        <Col md="auto">
                          <Button variant="primary" type="submit" onClick={handleSearchEntityUri}>Describe</Button>
                        </Col>
                      </Form.Row>
                    </Form.Group>
                  </Form>
                </Col>
              </Row>
            </Tab>
          </Tabs>

        </div> {/* container-fluid */}
      </div> {/* container-fluid */}
      <FctFooter />
    </div>
  )
}

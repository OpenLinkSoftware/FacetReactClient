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
import FctSideDrawer from '../FctSideDrawer';
import { fctConfig } from '../FctConfig'
import Backdrop from '../Backdrop';

import FctClientContext from '../FctClientContext';

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
        <img src={`${fctConfig.getDeploymentBasePath()}/img/opensearch.svg`} height="16" width="16" style={{ position: "relative", top: "-2px" }} />
      </Link>
    </OverlayTrigger>
  );
};

export default class SearchEntryPage extends React.Component {
  // TO DO: Newer syntax:
  // static contextType = FctClientContext;

  constructor(props, context) {
    super(props, context);

    this.state = {
      searchText: "",
      searchLabel: "",
      searchUri: "",
    };

    // Merge these handlers
    this.onChangeEntityText = this.context.fctClient.handleChangeSearchEntityText;
    this.onSearchOnEntityText = this.context.fctClient.handleSearchOnEntityText;
    this.onChangeEntityLabel = this.context.fctClient.handleChangeSearchEntityLabel;
    this.onSearchOnEntityLabel = this.context.fctClient.handleSearchOnEntityLabel;
    this.onChangeEntityUri = this.context.fctClient.handleChangeSearchEntityUri;
    this.onSearchOnEntityUri = this.context.fctClient.handleSearchOnEntityUri;

    this.handleChangeEntityText = this.handleChangeEntityText.bind(this);
    this.handleSearchOnEntityText = this.handleSearchOnEntityText.bind(this);
    this.handleChangeEntityLabel = this.handleChangeEntityLabel.bind(this);
    this.handleSearchOnEntityLabel = this.handleSearchOnEntityLabel.bind(this);
    this.handleChangeEntityUri = this.handleChangeEntityUri.bind(this);
    this.handleSearchOnEntityUri = this.handleSearchOnEntityUri.bind(this);
  }

  handleChangeEntityText(event) {
    this.setState({ searchText: event.target.value });
    this.onChangeEntityText(event.target.value);
  }

  handleSearchOnEntityText(event) {
    event.preventDefault();
    this.onSearchOnEntityText(this.state.searchText);
    this.props.history.push('/searchResults');
  }

  handleChangeEntityLabel(event) {
    this.setState({ searchLabel: event.target.value });
    this.onChangeEntityLabel(event.target.value);
  }

  handleSearchOnEntityLabel(event) {
    event.preventDefault();
    this.onSearchOnEntityLabel(this.state.searchLabel);
    // this.props.history.push('/searchResults')
  }

  handleChangeEntityUri(event) {
    this.setState({ searchUri: event.target.value });
    this.onChangeEntityUri(event.target.value);
  }

  handleSearchOnEntityUri(event) {
    event.preventDefault();
    this.onSearchOnEntityUri(this.state.searchUri);
    // this.props.history.push('/searchResults')
  }

  componentDidUpdate() {
    // If a new search has been triggered from the nav bar on this page,
    // we need to reflect changes back from FctClientContext to this component's state.
    // If a new search is triggered from a different page, this component should be
    // remounted. searchText, searchLabel and searchUri are then cleared in the constructor instead.
    if (this.state.searchText !== this.context.fctClient.state.searchText && !this.context.fctClient.state.searchText)
      this.setState({ searchText: this.context.fctClient.state.searchText })
    if (this.state.searchLabel !== this.context.fctClient.state.searchLabel && !this.context.fctClient.state.searchLabel)
      this.setState({ searchLabel: this.context.fctClient.state.searchLabel })
    if (this.state.searchUri !== this.context.fctClient.state.searchUri && !this.context.fctClient.state.searchUri)
      this.setState({ searchUri: this.context.fctClient.state.searchUri })
  }

  render() {
    let backdrop;

    if (this.props.sideDrawerOpen) {
      backdrop = <Backdrop clickHndlr={this.props.backdropClickHandler} />;
    }

    return (
      <div style={{ height: '100%' }}>
        <FctNavBar drawerToggleClickHandler={this.props.drawerToggleClickHandler} />
        <FctSideDrawer show={this.props.sideDrawerOpen} currentPageName="SearchEntryPage" />
        {backdrop}
        <div className="container-fluid">
          <div className="row">
            <div className="col text-right pt-2">
              <Link to="#" className="btn btn-outline-secondary" role="button">Featured Queries</Link>
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
                  {/* This Form is the equivalent of component FctSearchInputEditor */}
                  <Form>
                    <Form.Group controlId="frmSearchText">
                      <Form.Row>
                        <Col>
                          <Form.Control
                            type="text" placeholder="Search text"
                            value={this.state.searchText} onChange={this.handleChangeEntityText}
                          />
                        </Col>
                        <Col md="auto">
                          <Button variant="primary" type="submit" onClick={this.handleSearchOnEntityText}>Search</Button>
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
                          <Form.Control
                            type="text" placeholder="Label"
                            value={this.state.searchLabel} onChange={this.handleChangeEntityLabel}
                          />
                        </Col>
                        <Col md="auto">
                          <Button variant="primary" type="submit" onClick={this.handleSearchOnEntityLabel}>Describe</Button>
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
                          <Form.Control
                            type="text" placeholder="URI"
                            value={this.state.searchUri} onChange={this.handleChangeEntityUri}
                          />
                        </Col>
                        <Col md="auto">
                          <Button variant="primary" type="submit" onClick={this.handleSearchOnEntityUri}>Describe</Button>
                        </Col>
                      </Form.Row>
                    </Form.Group>
                  </Form>
                </Col>
              </Row>
            </Tab>
          </Tabs>
          <FctFooter />
        </div>
      </div>
    )
  }
}

SearchEntryPage.contextType = FctClientContext;

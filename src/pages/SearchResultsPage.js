import React from 'react';
import { Link } from 'react-router-dom'
import qs from 'qs'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'

import FctNavBar from '../FctNavBar';
import FctFooter from '../FctFooter';
import FctSideDrawer from '../FctSideDrawer';
import Backdrop from '../Backdrop';

import FctClientContext from '../FctClientContext';

import FctFilters from '../FctFilters';
import FctRspDbActvty from '../FctRspDbActvty';
import FctRspLimit from '../FctRspLimit';
import FctRspRslt from '../FctRspRslt';
import FctViewHeader from '../FctViewHeader';

const componentContainerStyle = {
  padding: '5px',
  border: 'solid 2px lightgray',
  marginBottom: '5px'
}

export default class SearchResultsPage extends React.Component {
  // TO DO: Newer syntax:
  // static contextType = FctClientContext;

  render() {
    let backdrop;

    if (this.props.sideDrawerOpen) {
      backdrop = <Backdrop clickHndlr={this.props.backdropClickHandler} />;
    }

    const fctClient = this.context.fctClient;
    const dbActivity = fctClient.state.fctResult ? fctClient.state.fctResult.json.facets["db-activity"] : '';
    const qryResult = fctClient.state.fctResult ? fctClient.state.fctResult.json.facets.result : null;
    const qryFilters = fctClient.fctQuery.queryFilterDescriptors();
    const viewSubjectIndex = fctClient.fctQuery.getViewSubjectIndex();
    const rowLimit = fctClient.fctQuery.getViewLimit();

    return (
      <div style={{ height: '100%' }}>
        <FctNavBar drawerToggleClickHandler={this.props.drawerToggleClickHandler} />
        <FctSideDrawer show={this.props.sideDrawerOpen} />
        {backdrop}
        <div className="container-fluid">
          <div className="row opl-filter-summary-background pr-3 pt-2">
            <div className="col">
              <FctViewHeader
                qryResult={qryResult}
                fctUiUtil={fctClient.fctUiUtil}
                queryText={fctClient.fctQuery.queryText}
                viewSubjectIndex={viewSubjectIndex}
              />
              <FctFilters
                viewSubjectIndex={viewSubjectIndex}
                qryFilters={qryFilters}
                fctUiUtil={fctClient.fctUiUtil}
                onSetSubjectFocus={fctClient.handleSetSubjectFocus}
                onDropQueryFilter={fctClient.handleDropQueryFilter}
                location={this.props.location}
              />
            </div>
            <div className="col-auto">
              <div className="d-flex flex-column">
                <div className="d-flex flex-row justify-content-end">
                  <OverlayTrigger
                    placement={'left'}
                    overlay={<Tooltip>View query as SPARQL</Tooltip>}
                  >
                    <Link to="" className="px-1">
                      <span className="oi oi-eye" style={{ color: "white" }}></span>
                    </Link>
                  </OverlayTrigger>
                  <OverlayTrigger
                    placement={'left'}
                    overlay={<Tooltip>Facet permalink</Tooltip>}
                  >
                    <Link to="" className="px-1">
                      <span className="oi oi-link-intact" style={{ color: "white" }}></span>
                    </Link>
                  </OverlayTrigger>
                  <OverlayTrigger
                    placement={'left'}
                    overlay={<Tooltip>View as Pivot collection</Tooltip>}
                  >
                    <Link to="" className="px-1">
                      <span className="oi oi-grid-three-up" style={{ color: "white" }}></span>
                    </Link>
                  </OverlayTrigger>
                </div>
                <div className="d-flex flex-row justify-content-end">
                  <div className="form-row">
                    <div className="form-group mr-3">
                      <label className="pr-1">Query limit:</label>
                      <FctRspLimit limit={rowLimit} onChange={fctClient.handleRowLimitChange} />
                    </div>
                    <div className="form-check mb-0 pt-2">
                      <input className="form-check-input" type="checkbox" value="" id="cbPagedSnapshot" />
                      <label className="form-check-label">Paged snapshot</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-12">
              <div>
                <FctRspRslt
                  qryResult={qryResult}
                  describeEndpoint={fctClient.describeEndpoint}
                  fctUiUtil={fctClient.fctUiUtil}
                  location={this.props.location}
                />
              </div>

              <div>
                <FctRspDbActvty dbActivity={dbActivity} />
              </div>
            </div>

          </div>

          <FctFooter />

          {/* TEMPORARY - REMOVE ONCE SIDEPANEL EQUIV IN PLACE */}
          <div className="col-sm-12">
            <div className="form-group row">
              <label htmlFor="frmViewType" className="col-sm-1 col-form-label text-right">View:</label>
              <div className="col-sm-4">
                <select value={fctClient.state.viewType} className="custom-select" onChange={fctClient.handleViewChange}>
                  <option value="properties-in">properties-in : [vt=properties-in]</option>
                  <option value="propval-list">propval-list : [vt=propval-list]</option>
                  <option value="classes">classes [vt=classes]</option>
                  <option value="text">entities [vt=text]</option>
                  <option value="text-d">text-d [vt=text-d]</option>
                  <option value="text-properties">text-properties [vt=text-properties]</option>
                  <option value="properties">attributes [vt=properties]</option>
                  <option value="list-count">distinct (count) [vt=list-count]</option>
                  <option value="list">list [vt=list]</option>
                </select>
              </div>
            </div>
          </div>

          {/* --^^^------------------------------------------- */}

        </div>
      </div>
    )
  }

}

SearchResultsPage.contextType = FctClientContext;

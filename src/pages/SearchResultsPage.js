import React from 'react';
import qs from 'qs'

import FctNavBar from '../FctNavBar';
import FctFooter from '../FctFooter';
import FctSideDrawer from '../FctSideDrawer';
import Backdrop from '../Backdrop';

import FctClientContext from '../FctClientContext';

import FctRspDbActvty from '../FctRspDbActvty';
import FctRspRslt from '../FctRspRslt';
import FctFilters from '../FctFilters';
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

    return (
      <div style={{ height: '100%' }}>
        <FctNavBar drawerToggleClickHandler={this.props.drawerToggleClickHandler} />
        <FctSideDrawer show={this.props.sideDrawerOpen} />
        {backdrop}
        <div className="container-fluid">
          <h3>Search Results Page</h3>
          <div className="row">

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
            <div className="col-sm-12">

              <div>Component: FctViewHeader</div>
              <div style={componentContainerStyle}>
                <FctViewHeader
                  qryResult={qryResult}
                  fctUiUtil={fctClient.fctUiUtil}
                  queryText={fctClient.fctQuery.queryText}
                  viewSubjectIndex={viewSubjectIndex}
                />
              </div>

              <div>Component: FctFilters</div>
              <div style={componentContainerStyle}>
                <FctFilters
                  viewSubjectIndex={viewSubjectIndex}
                  qryFilters={qryFilters}
                  fctUiUtil={fctClient.fctUiUtil}
                  onSetSubjectFocus={fctClient.handleSetSubjectFocus}
                  onDropQueryFilter={fctClient.handleDropQueryFilter}
                  location={this.props.location}
                />
              </div>

              <div>Component: FctRspRslt</div>
              <div style={componentContainerStyle}>
                <FctRspRslt
                  qryResult={qryResult}
                  describeEndpoint={fctClient.describeEndpoint}
                  fctUiUtil={fctClient.fctUiUtil}
                  location={this.props.location}
                />
              </div>

              <div>Component: FctRspDbActivity</div>
              <div style={componentContainerStyle}>
                <FctRspDbActvty dbActivity={dbActivity} />
              </div>
            </div>
          </div>

          <FctFooter />
        </div>
      </div>
    )
  }

}

SearchResultsPage.contextType = FctClientContext;

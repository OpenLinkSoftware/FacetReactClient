import React from 'react';

import { FctQuery, FctResult } from '../lib/facet-js-client.js';

import FctRspDbActvty from './FctRspDbActvty';
import FctRspRslt from './FctRspRslt';
import FctSearchInputEditor from './FctSearchInputEditor';
import FctFilters from './FctFilters';

// TO DO: Allow defaults to be set through a config .js file.
const FCT_QRY_DFLT_VIEW_LIMIT = 50; // Default view limit
const FCT_QRY_DFLT_VIEW_TYPE = "text";
// const FCT_QRY_DFLT_SVC_ENDPOINT = 'http://localhost:8896/fct/service';
const FCT_QRY_DFLT_SVC_ENDPOINT = 'http://linkeddata.uriburner.com/fct/service';

const componentContainerStyle = {
  padding: '10px',
  border: 'solid 2px lightgray',
  marginBottom: '20px'
}
// 


class FctClient extends React.Component {
  constructor() {
    super();
    this.state = { searchText: '', fctResult: null };
    this.handleSearch = this.handleSearch.bind(this);
    this.handleViewChange = this.handleViewChange.bind(this);
    this.handleSetSubjectFocus = this.handleSetSubjectFocus.bind(this);
    this.handleDropQueryFilter = this.handleDropQueryFilter.bind(this);
    this.handleDropQueryText = this.handleDropQueryText.bind(this);

    this.fctQuery = new FctQuery();
    this.fctQuery.setServiceEndpoint(FCT_QRY_DFLT_SVC_ENDPOINT);
    this.fctQuery.setViewLimit(FCT_QRY_DFLT_VIEW_LIMIT);
    this.fctQuery.setViewType(FCT_QRY_DFLT_VIEW_TYPE); 
  }

  handleSearch(searchInputEditorText) {
    searchInputEditorText = searchInputEditorText.trim();
    this.setState((state, props) => {
      return { searchText: searchInputEditorText };
    });

    // Search on searchInputEditorText as setState() is asynchronous and may not have returned yet.
    if (!searchInputEditorText) {
      this.setState(() => { fctResult: null });
    }
    else {
      this.fctQuery.queryText = searchInputEditorText;
      this.fctQuery.execute()
        .then(qryResult => {
          console.log(JSON.stringify(qryResult._resultJson)); // TO DO: Remove
          this.setState({ fctResult: qryResult });
        })
        .catch(err => {
          // TO DO: Display the error in the UI
          console.log('FctClient#handleSearch: Error: ' + err.message);
        });
    }
  }

  handleViewChange(event) {
    this.fctQuery.setViewType(event.target.value);
  }

  handleSetSubjectFocus(subjectId) {
    console.log('FctClient#handleSetSubjectFocus: subjectId:', subjectId) // TO DO: Remove
    // this.fctQuery.setViewSubjectIndex(subjectId); // TO DO: Enable
  }

  handleDropQueryFilter(filterId) {
    console.log('FctClient#handleDropQueryFilter: filterId:', filterId) // TO DO: Remove
    // this.fctQuery.removeQueryFilter(filterId); // TO DO: Enable
  }

  handleDropQueryText() {
    console.log('FctClient#handleDropQueryText') // TO DO: Remove
    // this.fctQuery.removeQueryText(); // TO DO: Enable
  }

  render() {
    const dbActivity = this.state.fctResult ? this.state.fctResult.json.facets["db-activity"] : '';
    const qryResult = this.state.fctResult ? this.state.fctResult.json.facets.result : null;

    return (
      <div>
        <p>Component: FctSearchInputEditor</p>
        <div style={componentContainerStyle}>
          <FctSearchInputEditor searchText={this.state.searchText} onSearch={this.handleSearch} />
        </div>

        <div class="col-sm-12">
          <div class="form-group row">
            <label for="frmViewType" class="col-sm-1 col-form-label text-right">View:</label>
            <div class="col-sm-2">
              <select class="custom-select" onChange={this.handleViewChange}>
                <option value="text" selected>entities</option>
                <option value="classes">classes</option>
                <option value="properties">attributes</option>
                <option value="list-count">distinct (count)</option>
              </select>
            </div>
          </div>
        </div>

        <p>Component: FctRspDbActivity</p>
        <div style={componentContainerStyle}>
          <FctRspDbActvty dbActivity={dbActivity} />
        </div>

        <p>Component: FctRspRslt</p>
        <div style={componentContainerStyle}>
          <FctRspRslt qryResult={qryResult} />
        </div>

        <p>Component: FctFilters</p>
        <div style={componentContainerStyle}>
        <FctFilters 
          onSetSubjectFocus={this.handleSetSubjectFocus} 
          onDropQueryFilter={this.handleDropQueryFilter} 
          onDropQueryText={this.handleDropQueryText} 
          />
        </div>
      </div>
    );
  }
}

export default FctClient;

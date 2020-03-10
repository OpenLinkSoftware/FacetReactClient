import React from 'react';

import { FctQuery, FctResult } from '../lib/facet-js-client.js';

export default class FctRspPager extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let html;
    let rowCount = 0;
    let qryResult = this.props.qryResult;
    if (qryResult && qryResult.row)
    {
      const rRows = !Array.isArray(qryResult.row) ? [qryResult.row] : qryResult.row;
      rowCount = rRows.length;
    }

    if (rowCount > 0) {
      html = <span>Go to: [ ] Show: [xxx] Displaying rows: 1 - {rowCount} of {rowCount} total</span>
    }
    else {
      html = <span>Go to: [ ] Show: [xxx] {rowCount} total</span>
    }

  return html;
  }
}
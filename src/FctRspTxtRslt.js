// A component to display the <fct:result type="text"> element of a Facet service response.

// qryResult._resultJson.facets.result // TO DO: Remove

import React from 'react';
import * as fctUiCommon from './FctUiCommon';

const componentContainerStyle = {
  overflowX: 'auto',
  overflowY: 'auto',
  maxHeight: '200px',
  maxWidth: '100%',
} 

export default class FctRspTxtRslt extends React.Component {

  constructor(props) {
    super(props);
    if (props.qryResult["@type"] !== "text")
      throw new Error (`Invalid Facet result type supplied. (${props.qryResult["@type"]})`);
  }

  render() {
    let html = fctUiCommon.emptyResultSetMessage();
    const describeEndpoint = this.props.describeEndpoint;

    if (this.props.qryResult && this.props.qryResult.row)
    {
      html = "";
      
      // Facet text result/view column mappings
      const columnHeadings = ['trank', 'erank', 'Named Graph', 'Entity URI', 'Title', 'Matched Text'];

      let renderedHeadings = <thead><tr>{
        columnHeadings.map(heading => {
          return <th key={heading}>{heading}</th>;
        })
      }</tr></thead>;

      let rows = this.props.qryResult.row;
      if (!Array.isArray(rows)) // => a single results row
        rows = [rows];
        let renderedRows = rows.map((row, iRow) => {
          let renderedCols = row.column.map((col, iCol) => {
          // colStyle prevents word splitting on an erank with a 
          // negative exponent. (The minus sign is interpreted as a hyphen.)
          let colStyle  = {};
          colStyle = iCol === 1 ? { minWidth: '8em' } : colStyle;
          colStyle = iCol === 5 ? { minWidth: '20em' } : colStyle;
          return <td key={iCol} style={colStyle}>{renderColVal(col, iCol)}</td>
        })
        return <tr key={iRow}>{renderedCols}</tr>;
      })
      renderedRows = <tbody>{renderedRows}</tbody>;

      html = (
        <div>
        <span><em>text / FctRspTxtRslt result:</em></span>
          <table className="table table-sm table-striped">
          {renderedHeadings} 
          {renderedRows}
          </table>
          </div>
        );
    }
    
    return <div style={componentContainerStyle}>{html}</div>;

    function renderColVal(col, iCol) {
      let val;
      let href;

      switch (iCol) {
        case 0: // trank / text rank
          val = Number(col.keyValue);
          val = Number.isNaN(val) ? 'NaN' : val.toPrecision(5);
          break;
        case 1: // erank / entity rank
          val = Number(col.keyValue);
          val = Number.isNaN(val) ? 'NaN' : val.toPrecision(5);
        break;
        case 2: // g / named graph
          // .toString() applied to protect against garbage in the source data
          // e.g. linkeddata.uriburner.com sometimes returns a date literal for
          // this column which JS converts to an object, which React then
          // rejects as invalid in JSX.
          href = `${describeEndpoint}?url=${encodeURIComponent(col.keyValue.toString())}`;
          // col["@shortform"] not present in resultset
          val = <a href={href}>{col.keyValue.toString()}</a>;
          break;
        case 3: // entity URI
          href = `${describeEndpoint}?url=${encodeURIComponent(col.keyValue.toString())}`;
          val = <a href={href}>{col["@shortform"].toString()}</a>;
          break;
        case 4: // title
          val = typeof col === 'string' ? col : '';
          break;
        case 5: // matched text / search excerpt
          val = col.toString().replace(/&lt;/g, '<').replace(/&gt;/g, '>');
          val = <span dangerouslySetInnerHTML={{ __html: val }}></span>
          break;
      }
      return val;
    }
  }

}
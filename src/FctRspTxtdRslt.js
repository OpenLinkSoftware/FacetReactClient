// A component to display the <fct:result type="text-d"> element of a Facet service response.

// qryResult._resultJson.facets.result // TO DO: Remove

import React from 'react';
import * as fctUiCommon from './FctUiCommon';

const componentContainerStyle = {
  overflowX: 'auto',
  overflowY: 'auto',
  maxHeight: '200px',
  maxWidth: '100%',
} 

export default class FctRspTxtdRslt extends React.Component {

  constructor(props) {
    super(props);
    if (props.qryResult["@type"] !== "text-d")
      throw new Error (`Invalid Facet result type supplied. (${props.qryResult["@type"]})`);
  }

  render() {
    let html = fctUiCommon.emptyResultSetMessage();

    if (this.props.qryResult && this.props.qryResult.row)
    {
      html = "";
      
      // Facet text result/view column mappings
      const columnHeadings = ['trank', 'erank', 'Entity', 'Title', 'Named Graph',  'Matched Text'];

      let renderedHeadings = <thead><tr>{
        columnHeadings.map(heading => {
          return <th>{heading}</th>;
        })
      }</tr></thead>;

      let rows = this.props.qryResult.row;
      if (!Array.isArray(rows)) // => a single results row
        rows = [rows];
      let renderedRows = rows.map((row) => {
        let renderedCols = row.column.map((col, iCol) => {
          // colStyle prevents word splitting on an erank with a 
          // negative exponent. (The minus sign is interpreted as a hyphen.)
          let colStyle  = {};
          colStyle = iCol === 1 ? { minWidth: '8em' } : colStyle;
          colStyle = iCol === 5 ? { minWidth: '20em' } : colStyle;
          return <td style={colStyle}>{renderColVal(col, iCol)}</td>
        })
        return <tr>{renderedCols}</tr>;
      })
      renderedRows = <tbody>{renderedRows}</tbody>;

      html = (
      <div>
      <span><em>text-d / FctRspTxtdRslt result:</em></span>
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

      switch (iCol) {
        case 0: // trank / text rank
          val = Number(col.keyValue);
          val = Number.isNaN(val) ? 'NaN' : val.toPrecision(5);
          break;
        case 1: // erank / entity rank
          val = Number(col.keyValue);
          val = Number.isNaN(val) ? 'NaN' : val.toPrecision(5);
          break;
        case 2: // entity URI (urn: or http[s]:)
          if (col.keyValue.toString().startsWith('http'))
            val = <a href={col.keyValue}>{col["@shortform"]}</a>;
          else
            val = col.keyValue.toString();
          break;
        case 3: // title
          val = typeof col === 'string' ? col : '';
          break;
        case 4: // g / named graph
          val = col.keyValue.toString();
          break;
        case 5: // matched text / search excerpt
          val = <span dangerouslySetInnerHTML={{ __html: col }}></span>
          break;
      }
      return val;
    }
  }

}
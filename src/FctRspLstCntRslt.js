// A component to display the <fct:result type="list-count"> element of a Facet service response.

import React from 'react';
import * as fctUiCommon from './FctUiCommon';

const componentContainerStyle = {
  overflowX: 'auto',
  overflowY: 'auto',
  maxHeight: '400px',
  maxWidth: '100%',
  fontSize: '80%', 
}

export default class FctRspLstCntRslt extends React.Component {

  constructor(props) {
    super(props);
    // console.log("FctRspLstCntRslt#constructor: props:", props)
    if (props.qryResult["@type"] !== "list-count")
      throw new Error(`Invalid Facet result type supplied. (${props.qryResult["@type"]})`);
  }

  render() {
    let html = fctUiCommon.emptyResultSetMessage();
    
    if (this.props.qryResult && this.props.qryResult.row)
    {
      html = "";
      
      // Facet list-count result/view column mappings
      const columnHeadings = ['Entity', 'Count'];

      let renderedHeadings = <thead><tr>{
        columnHeadings.map(heading => {
          return <th>{heading}</th>;
        })
      }</tr></thead>;

      let rows = this.props.qryResult.row;
      if (!Array.isArray(rows)) // => a single results row
        rows = [rows];
      let renderedRows = rows.map((row) => {
        let cols = row.column;
        // cols[0]: class URI (@keyValue) + class curie (@shortForm)
        // cols[1]: class label
        // cols[2]: class occurrence count

        let classURI = cols[0].keyValue;
        let classCurie = cols[0]["@shortform"];
        let typeColVal;

        if (cols[0]["@datatype"] === "uri") {
          // typeof cols[1] is 'string' or 'boolean'
          if (typeof cols[1] === 'string') {
            let classLabel = cols[1];
            typeColVal = <a href={classURI}>{classLabel}</a>;
          }
          else {
            typeColVal = <a href={classURI}>{classCurie}</a>;
          }
        }
        else {
          typeColVal = rowCols[0].keyValue.toString();
        }
        
        let countColVal;
        countColVal = Number(cols[2]);
        countColVal = Number.isNaN(countColVal) ? 'NaN' : countColVal;

        let renderedCols = <><td>{typeColVal}</td><td>{countColVal}</td></>;
        return <tr>{renderedCols}</tr>;
      });

      renderedRows = <tbody>{renderedRows}</tbody>;

      html = `
        <div>
        <span><em>list-count / FctRspLstCntRslt result:</em></span>` +
        '<table class="table table-sm table-striped">' + 
        renderedHeadings + 
        renderedRows +
        `</table>
        </div>`;
      html = (
        <div>
        <span><em>list-count / FctRspLstCntRslt result:</em></span>
          <table className="table table-sm table-striped">
          {renderedHeadings}
          {renderedRows}
          </table>
          </div>
        );    
    }
    
    return <div style={componentContainerStyle}>{html}</div>;
  }

}
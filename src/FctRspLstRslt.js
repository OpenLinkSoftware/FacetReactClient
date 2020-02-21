// A component to display the <fct:result type="list"> element of a Facet service response.

import React from 'react';
import { Link } from 'react-router-dom';

const componentContainerStyle = {
  overflowX: 'auto',
  overflowY: 'auto',
  maxHeight: '200px',
  maxWidth: '100%',
}

export default class FctRspLstRslt extends React.Component {

  constructor(props) {
    super(props);
    // console.log("FctRspLstRslt#constructor: props:", props);
    if (props.qryResult["@type"] !== "list")
      throw new Error(`Invalid Facet result type supplied. (${props.qryResult["@type"]})`);
  }

  render() {
    let html = "Empty result set";
    
    if (this.props.qryResult && this.props.qryResult.row)
    {
      html = "";
      
      // Facet list result/view column mappings
      const columnHeadings = ['', '']; // No headings in /fct version

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
        // cols[0]: item
        // cols[1]: item label

        let item = cols[0].keyValue;
        let itemCurie = cols[0]["@shortform"];
        let itemLabel = cols[1];
        let itemColVal;

        if (cols[0]["@datatype"] === "uri") {
          if (itemLabel) {
            itemColVal = <Link to={item}>{itemLabel}</Link>;
          }
          else {
            itemColVal = <Link to={item}>{itemCurie}</Link>;
          }
        }
        else
          itemColVal = cols[0].keyValue.toString();

        let dataType = cols[0]["@datatype"];
        let renderedCols = <><td>{itemColVal}</td><td>{dataType}</td></>;
        return <tr>{renderedCols}</tr>;
      });

      renderedRows = <tbody>{renderedRows}</tbody>;

      html = (
        <div>
        <span><em>list / FctRspLstRslt result:</em></span>
        <table class="table table-sm table-striped">
        {renderedHeadings} 
        {renderedRows}
        </table>
        </div>
      );
    }
    
    return <div style={componentContainerStyle}>{html}</div>;
  }

}
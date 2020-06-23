// A component to display the <fct:result type="list"> element of a Facet service response.

import React from 'react';
import { Link } from 'react-router-dom';
import FctView from './FctView';
import * as fctUiCommon from './FctUiCommon';

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
    let html = fctUiCommon.emptyResultSetMessage();
    
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

        let item = cols[0].keyValue.toString();
        let itemCurie = cols[0]["@shortform"];
        let itemLabel = cols[1];
        let itemColVal;
        let dataType = cols[0]["@datatype"];

        let actionOpts = {
          path: '/plain_components',
          action: FctView.fctViewAction('cond'),
          cond_t: 'eq', // TO DO: Need UI control to set the condition: ==, !==, >, >=, <, <=, between, not between, contains, in, not in
          val: item,
          dataType,
          lang: null  
        };
        let href = FctView.fctBuildAction(actionOpts);

        if (dataType === "uri" && itemLabel) {
          itemColVal = <Link to={href}>{itemLabel}</Link>;
        }
        else if (dataType === "uri" && itemCurie) {
          itemColVal = <Link to={href}>{itemCurie}</Link>;
        }
        else {
          itemColVal = <Link to={href}>{item}</Link>;
        }

        let renderedCols = <><td>{itemColVal}</td><td>{dataType}</td></>;
        return <tr>{renderedCols}</tr>;
      });

      renderedRows = <tbody>{renderedRows}</tbody>;

      html = (
        <div>
        <span><em>list / FctRspLstRslt result:</em></span>
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

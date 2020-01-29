// A component to display the <fct:result type="text-properties"> element of a Facet service response.

// Examples:
// View type 'text-properties' is triggered by filter link 'any attribute'.
// e.g. ?s1 has [[any attribute]] with value "linked data".

import React from 'react';
import { Link } from 'react-router-dom';

import FctView from './FctView';

const componentContainerStyle = {
  overflowX: 'auto',
  overflowY: 'auto',
  maxHeight: '200px',
  maxWidth: '100%',
}

export default class FctRspTxtPrprtsRslt extends React.Component {

  constructor(props) {
    super(props);
    // console.log("FctRspTxtPrprtsRslt#constructor: props:", props);
    if (props.qryResult["@type"] !== "text-properties")
      throw new Error(`Invalid Facet result type supplied. (${props.qryResult["@type"]})`);
  }

  render() {
    let html = "Empty result set";
    
    if (this.props.qryResult && this.props.qryResult.row)
    {
      // Facet text-properties result/view column mappings
      const columnHeadings = ['Attribute', 'Count'];
      let renderedHeadings = <thead><tr>{
          columnHeadings.map(heading => {
            return <th>{heading}</th>;
          })
        }</tr></thead>;

      let rows = this.props.qryResult.row;
      if (!Array.isArray(rows))
        rows = [rows];
      let renderedRows = rows.map((row) => {
        let cols = row.column;
        // cols[0]: class URI (@keyValue) + class curie (@shortForm)
        // cols[1]: text value
        // cols[2]: occurrence count

        let classURI = cols[0].keyValue;
        let classCurie = cols[0]["@shortform"];
        let typeColVal;

        let actionOpts = {
          action: FctView.fctViewAction('text-properties'),
          iri: classURI,
          dataType: cols[0]["@datatype"]
        };
        let href = FctView.fctBuildAction(actionOpts);

        if (cols[0]["@datatype"] === "uri") {
          // typeof cols[1] is 'string' or 'boolean'
          if (typeof cols[1] === 'string') {
            let classLabel = cols[1];
            typeColVal = <Link to={href}>{classLabel}</Link>;
          }
          else {
            typeColVal = <Link to={href}>{classCurie}</Link>;
          }
        }
        else
          typeColVal = cols[0].keyValue.toString();
          
        let countColVal = Number(cols[2]);
        countColVal = Number.isNaN(countColVal) ? 'NaN' : countColVal;
        
        let renderedCols = <><td>{typeColVal}</td><td>{countColVal}</td></>;
        return <tr>{renderedCols}</tr>;
      });

      renderedRows = <tbody>{renderedRows}</tbody>;

      html = (
        <div>
        <span><em>text-properties / FctRspTxtPrprts result:</em></span>
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

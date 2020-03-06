// A component to display the <fct:result type="classes"> element of a Facet service response.

import React from 'react';
import { Link } from 'react-router-dom';

const componentContainerStyle = {
  overflowX: 'auto',
  overflowY: 'auto',
  maxHeight: '200px',
  maxWidth: '100%',
}

export default class FctRspClssRslt extends React.Component {

  constructor(props) {
    super(props);
    // console.log("FctRspClssRslt#constructor: props:", props);
    if (props.qryResult["@type"] !== "classes")
      throw new Error(`Invalid Facet result type supplied. (${props.qryResult["@type"]})`);
  }

  render() {
    let html = "Empty result set";
    
    if (this.props.qryResult && this.props.qryResult.row)
    {
      html = "";
      
      // Facet classes result/view column mappings
      const columnHeadings = ['?s1 instanceOf Type', 'Count']; // TO DO: Should be `?s${pos}`, pos = 1,2,...

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
            typeColVal = <Link to={classURI}>{classLabel}</Link>;
          }
          else {
            typeColVal = <Link to={classURI}>{classCurie}</Link>;
          }
        }
        else {
          typeColVal = cols[0].keyValue.toString();
        }
          
        let countColVal;
        countColVal = Number(cols[2]);
        countColVal = Number.isNaN(countColVal) ? 'NaN' : countColVal;
          
        let renderedCols = <><td>{typeColVal}</td><td>{countColVal}</td></>;
        return <tr>{renderedCols}</tr>;
      });

      renderedRows = <tbody>{renderedRows}</tbody>;

      html = (
        <div>
        <span><em>classes / FctRspClssRslt result:</em></span>
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

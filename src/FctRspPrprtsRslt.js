// A component to display the <fct:result type="properties"> element of a Facet service response.

import React from 'react';
import { Link } from 'react-router-dom';

import FctView from './FctView';

const componentContainerStyle = {
  overflowX: 'auto',
  overflowY: 'auto',
  maxHeight: '200px',
  maxWidth: '100%',
}

export default class FctRspPrprtsRslt extends React.Component {

  constructor(props) {
    super(props);
    if (props.qryResult["@type"] !== "properties")
      throw new Error(`Invalid Facet result type supplied. (${props.qryResult["@type"]})`);
  }

  render() {
    let html = "Empty result set";
    
    if (this.props.qryResult && this.props.qryResult.row)
    {
      html = "";
      
      // Facet properties result/view column mappings
      const columnHeadings = ['?s1 has Attribute', 'Count'];

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
        // cols[0]: property URI (@keyValue) + property curie (@shortForm)
        // cols[1]: property label
        // cols[2]: property occurrence count

        let propertyURI = cols[0].keyValue;
        let propertyCurie = cols[0]["@shortform"];
        let propertyColVal;

        let actionOpts = {
          action: FctView.fctViewAction('properties'),
          iri: propertyURI,
          dataType: cols[0]["@datatype"]
        };
        let href = FctView.fctBuildAction(actionOpts);

        if (cols[0]["@datatype"] === "uri") {
          // typeof cols[1] is 'string' or 'boolean'
          if (typeof cols[1] === 'string') {
            let propertyLabel = cols[1];
            propertyColVal = <Link to={href}>{propertyLabel}</Link>;
          }
          else {
            propertyColVal = <Link to={href}>{propertyCurie}</Link>;
          }
        }
        else
          propertyColVal = cols[0].keyValue.toString();

        renderedCols += "<td>" + propertyColVal + "</td>";

        let countColVal = Number(cols[2]);
        countColVal = Number.isNaN(countColVal) ? 'NaN' : countColVal;

        let renderedCols = <><td>{propertyColVal}</td><td>{countColVal}</td></>
        return <tr>{renderedCols}</tr>;
      });

      renderedRows = <tbody>{renderedRows}</tbody>;

      html = (
        <div>
        <span><em>properties / FctRspPrprtsRslt result:</em></span>
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

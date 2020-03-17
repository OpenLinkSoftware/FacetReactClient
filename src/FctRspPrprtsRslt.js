// A component to display the <fct:result type="properties"> element of a Facet service response.

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

export default class FctRspPrprtsRslt extends React.Component {

  constructor(props) {
    super(props);
    if (props.qryResult["@type"] !== "properties")
      throw new Error(`Invalid Facet result type supplied. (${props.qryResult["@type"]})`);
  }

  render() {
    let html = fctUiCommon.emptyResultSetMessage();
    
    if (this.props.qryResult && this.props.qryResult.row)
    {
      html = "";
      
      // Facet properties result/view column mappings
      const columnHeadings = ['?s1 has Attribute', '', 'Count']; // TO DO: Should be `?s${pos}`, pos = 1,2,..

      let renderedHeadings = <thead><tr>{
        columnHeadings.map(heading => {
          return <th>{heading}</th>;
        })
      }</tr></thead>;

      let rows = this.props.qryResult.row;
      if (!Array.isArray(rows)) // => a single results row
        rows = [rows];
      let renderedRows = rows.map((row) => {
        let renderedCols;
        let cols = row.column;
        // cols[0]: property URI (@keyValue) + property curie (@shortForm)
        // cols[1]: property label
        // cols[2]: property occurrence count

        let propertyURI = cols[0].keyValue;
        let propertyCurie = cols[0]["@shortform"];
        let dataType = cols[0]["@datatype"];
        let propertyLabel = cols[1];

        // Rendered view columns
        let propertyColVal;
        let describeLink;
        let countColVal;

        // Protect against bad data
        if (typeof propertyURI !== 'string')
          propertyURI = null;
        if (propertyURI && !(propertyURI.startsWith('http') || propertyURI.startsWith('urn')))
          propertyURI = null;
        if (propertyLabel && typeof propertyLabel !== 'string')
          propertyLabel = null;
        if (propertyCurie && typeof propertyCurie !== 'string')
          propertyCurie = null;
        if (dataType && (typeof dataType !== 'string' || dataType !== 'uri'))
          dataType = null;

        propertyColVal = '';
        describeLink = '';
        countColVal = '';

        if (propertyURI)
        {
          let actionOpts = {
            action: FctView.fctViewAction('properties'),
            iri: propertyURI,
            dataType,
            lang: null
          };
          let href = FctView.fctBuildAction(actionOpts);

          if (propertyLabel)
            propertyColVal = <Link to={href}>{propertyLabel}</Link>;
          else if (propertyCurie)
            propertyColVal = <Link to={href}>{propertyCurie}</Link>;
          else
            propertyColVal = <Link to={href}>{propertyURI}</Link>;

          let describeUrl = `${this.props.describeEndpoint}?url=${encodeURIComponent(propertyURI)}`;
          let describeAncText = `Describe ${this.props.fctUiUtil.fctPredicateTerm()}`;
          describeLink = <a href={describeUrl} title={propertyCurie}>{describeAncText}</a>
  
          countColVal = Number(cols[2]);
          countColVal = Number.isNaN(countColVal) ? 'NaN' : countColVal;  
          renderedCols = <><td>{propertyColVal}</td><td>{describeLink}</td><td>{countColVal}</td></>
        }
        else
        {
          renderedCols = <><td></td><td></td><td></td></>; // Bad source data
        }

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

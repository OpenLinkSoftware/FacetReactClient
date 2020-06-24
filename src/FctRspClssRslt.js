// A component to display the <fct:result type="classes"> element of a Facet service response.

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

export default class FctRspClssRslt extends React.Component {

  constructor(props) {
    super(props);
    if (props.qryResult["@type"] !== "classes")
      throw new Error(`Invalid Facet result type supplied. (${props.qryResult["@type"]})`);
  }

  render() {
    let html = fctUiCommon.emptyResultSetMessage();
    
    if (this.props.qryResult && this.props.qryResult.row)
    {
      html = "";
      
      // Facet classes result/view column mappings
      const columnHeadings = ['?s1 instanceOf Type', '', 'Count']; // TO DO: Should be `?s${pos}`, pos = 1,2,...

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
        // cols[0]: class URI (@keyValue) + class curie (@shortForm)
        // cols[1]: class label
        // cols[2]: class occurrence count

        let classURI = cols[0].keyValue;
        let classCurie = cols[0]["@shortform"];
        let dataType = cols[0]["@datatype"];
        let classLabel = cols[1];

        // Rendered view columns
        let typeColVal;
        let describeLink;
        let countColVal;

        /*
        // Bad data checks
        //
        // Examples of bad data from linkeddata.uriburner.com:
        // classURI a curie - schema:WebSite
        // classURI, classLabel or classCurie a date object - Sat Jan 01 2000 00:00:00 GMT+0000 (Greenwich Mean Time)
        // classLabel a boolean - true

        if (classURI && !(typeof classURI === 'string')) 
          console.log('bad classURI:', classURI.toString(), 
            `[${typeof classURI}]`, ', dataType:', dataType);
        if (classCurie && !(typeof classCurie === 'string')) 
          console.log('bad classCurie:',  
            classCurie.toString(), `[${typeof classCurie}]`, 
            ', classURI: ', classURI.toString(), ', dataType:', dataType);
        if (classLabel && !(typeof classLabel === 'string')) 
          console.log('bad classLabel:', 
            classLabel.toString(), `[${typeof classLabel}]`, 
            ', classURI: ', classURI.toString(), ', dataType:', dataType);
        */

        // Protect against bad data
        if (typeof classURI !== 'string')
          classURI = null;
        if (classURI && !(classURI.startsWith('http') || classURI.startsWith('urn')))
          classURI = null;
        if (classLabel && typeof classLabel !== 'string')
          classLabel = null;
        if (classCurie && typeof classCurie !== 'string')
          classCurie = null;
        if (dataType && (typeof dataType !== 'string' || dataType !== 'uri'))
          dataType = null;

        typeColVal = '';
        describeLink = '';
        countColVal = '';

        if (classURI)
        {
          let actionOpts = {
            path: this.props.location.pathname,
            action: FctView.fctViewAction('classes'),
            iri: classURI,
            dataType,
            lang: null
          };
          let href = FctView.fctBuildAction(actionOpts);

          if (classLabel)
            typeColVal = <Link to={href}>{classLabel}</Link>;
          else if (classCurie)
            typeColVal = <Link to={href}>{classCurie}</Link>;
          else
            typeColVal = <Link to={href}>{classURI}</Link>;

          let describeUrl = `${this.props.describeEndpoint}?url=${encodeURIComponent(classURI)}`;
          let describeAncText = `Describe ${this.props.fctUiUtil.fctClassTerm()}`;
          describeLink = <a href={describeUrl} title={classCurie}>{describeAncText}</a>
  
          countColVal = Number(cols[2]);
          countColVal = Number.isNaN(countColVal) ? 'NaN' : countColVal;
          renderedCols = <><td>{typeColVal}</td><td>{describeLink}</td><td>{countColVal}</td></>;
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

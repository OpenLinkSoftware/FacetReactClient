// A component to display the <fct:result type="classes"> element of a Facet service response.

import React from 'react';

const componentContainerStyle = {
  overflowX: 'auto',
  overflowY: 'auto',
  maxHeight: '200px',
  maxWidth: '100%',
}

export default class FctRspClssRslt extends React.Component {

  constructor(props) {
    super(props);
    console.log("FctRspClssResult#constructor: props:", props)
    if (props.qryResult["@type"] !== "classes")
      throw new Error(`Invalid Facet result type supplied. (${props.fctTextResult["@type"]})`);
    this.state = { qryResult: props.qryResult };
  }

  render() {
    let html = "Empty result set";
    
    if (this.state.qryResult && this.state.qryResult.row)
    {
      html = "";
      
      // Facet classes result/view column mappings
      const columnHeadings = ['?s1 instanceOf Type', 'Count'];

      let renderedHeadings = columnHeadings.map(heading => {
        return `<th>${heading}</th>`;
      });
      renderedHeadings = `<thead><tr>${renderedHeadings.join('')}</tr></thead>`;

      let rows = this.state.qryResult.row;
      let renderedRows = rows.map((row) => {
        let renderedCols = '';
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
            typeColVal = `<a href="${classURI}">${classLabel}</a>`;
          }
          else {
            typeColVal = `<a href="${classURI}">${classCurie}</a>`;
          }
        }
        else
          typeColVal = rowCols[0].keyValue.toString();
        renderedCols += "<td>" + typeColVal + "</td>";

        let countColVal;
        countColVal = Number(cols[2]);
        countColVal = Number.isNaN(countColVal) ? 'NaN' : countColVal;
        renderedCols += "<td>" + countColVal + "</td>";

        return "<tr>" + renderedCols + "</tr>";
      })
      renderedRows = `<tbody>${renderedRows.join('')}</tbody>`;

      html = 
        '<table class="table table-sm table-striped">' + 
        renderedHeadings + 
        renderedRows +
        "</table>";
    }
    
    return ( 
      <div 
      style={componentContainerStyle} 
      dangerouslySetInnerHTML={{__html: html}}>
      </div> );
  }

}
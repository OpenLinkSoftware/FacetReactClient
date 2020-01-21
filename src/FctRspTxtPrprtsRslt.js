// A component to display the <fct:result type="text-properties"> element of a Facet service response.

// Examples:
// View type 'text-properties' is triggered by filter link 'any attribute'.
// e.g. ?s1 has [[any attribute]] with value "linked data".

import React from 'react';

const componentContainerStyle = {
  overflowX: 'auto',
  overflowY: 'auto',
  maxHeight: '200px',
  maxWidth: '100%',
}

export default class FctRspTxtPrprtsRslt extends React.Component {

  constructor(props) {
    super(props);
    console.log("FctRspTxtPrprtsRslt#constructor: props:", props);
    if (props.qryResult["@type"] !== "text-properties")
      throw new Error(`Invalid Facet result type supplied. (${props.fctTextResult["@type"]})`);
    this.state = { qryResult: props.qryResult };
  }

  render() {
    let html = "Empty result set";
    
    if (this.state.qryResult && this.state.qryResult.row)
    {
      html = "";
      
      // Facet text-properties result/view column mappings
      const columnHeadings = ['Attribute', 'Count'];

      let renderedHeadings = columnHeadings.map(heading => {
        return `<th>${heading}</th>`;
      });
      renderedHeadings = `<thead><tr>${renderedHeadings.join('')}</tr></thead>`;

      let rows = this.state.qryResult.row;
      if (!Array.isArray(rows))
        rows = [rows];
      let renderedRows = rows.map((row) => {
        let renderedCols = '';
        let cols = row.column;
        // cols[0]: class URI (@keyValue) + class curie (@shortForm)
        // cols[1]: text value
        // cols[2]: occurrence count

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
          typeColVal = cols[0].keyValue.toString();
        renderedCols += "<td>" + typeColVal + "</td>";

        let countColVal;
        countColVal = Number(cols[2]);
        countColVal = Number.isNaN(countColVal) ? 'NaN' : countColVal;
        renderedCols += "<td>" + countColVal + "</td>";

        return "<tr>" + renderedCols + "</tr>";
      })
      renderedRows = `<tbody>${renderedRows.join('')}</tbody>`;

      html = `
        <div>
        <span><em>text-properties / FctRspTxtPrprts result:</em></span>` +
        '<table class="table table-sm table-striped">' + 
        renderedHeadings + 
        renderedRows +
        `</table>
        </div>`;

    }
    
    return ( 
      <div 
      style={componentContainerStyle} 
      dangerouslySetInnerHTML={{__html: html}}>
      </div> );
  }

}
// A component to display the <fct:result type="propval-list"> element of a Facet service response.

import React from 'react';

const componentContainerStyle = {
  overflowX: 'auto',
  overflowY: 'auto',
  maxHeight: '200px',
  maxWidth: '100%',
}

export default class FctRspPrpVlLstRslt extends React.Component {

  constructor(props) {
    super(props);
    // console.log("FctRspPrpVlLstRslt#constructor: props:", props);
    if (props.qryResult["@type"] !== "propval-list")
      throw new Error(`Invalid Facet result type supplied. (${props.qryResult["@type"]})`);
  }

  render() {
    let html = "Empty result set";
    
    if (this.props.qryResult && this.props.qryResult.row)
    {
      html = "";
      
      // Facet classes result/view column mappings
      const columnHeadings = ['Entity', 'Entity Label'];

      let renderedHeadings = columnHeadings.map(heading => {
        return `<th>${heading}</th>`;
      });
      renderedHeadings = `<thead><tr>${renderedHeadings.join('')}</tr></thead>`;

      let rows = this.props.qryResult.row;
      if (!Array.isArray(rows)) // => a single results row
      rows = [rows];
      let renderedRows = rows.map((row) => {
        let renderedCols = '';
        let cols = row.column;
        // cols[0]: entity URI (@keyValue) + entity curie? (@shortForm)
        // cols[1]: entity label

        let itemURI = cols[0].keyValue;
        let itemCurie = cols[0]["@shortform"];
        let itemLabel = cols[1].toString();
        let itemColVal;

        if (cols[0]["@datatype"] === "uri") {
          // typeof cols[1] is usually a 'string'. Other types possible? // TO DO
          if (typeof cols[1] === 'string') {
            let itemLabel = cols[1];
            itemColVal = `<a href="${itemURI}">${itemLabel}</a>`;
          }
          else {
            itemColVal = `<a href="${itemURI}">${itemCurie}</a>`;
          }
        }
        else
          itemColVal = cols[0].keyValue.toString();
        renderedCols += "<td>" + itemColVal + "</td>";

        renderedCols += "<td>" + itemLabel + "</td>";

        return "<tr>" + renderedCols + "</tr>";
      })
      renderedRows = `<tbody>${renderedRows.join('')}</tbody>`;

      html = `
      <div>
      <span><em>propval-list / FctRspPrpVlLstRslt result:</em></span>` +
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
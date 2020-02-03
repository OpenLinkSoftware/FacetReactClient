// A component to display the <fct:result type="text"> element of a Facet service response.

// qryResult._resultJson.facets.result // TO DO: Remove

import React from 'react';

const componentContainerStyle = {
  overflowX: 'auto',
  overflowY: 'auto',
  maxHeight: '200px',
  maxWidth: '100%',
} 

export default class FctRspTxtRslt extends React.Component {

  constructor(props) {
    super(props);
    if (props.qryResult["@type"] !== "text")
      throw new Error (`Invalid Facet result type supplied. (${props.qryResult["@type"]})`);
  }

  render() {
    let html = <span>Empty result set</span>
    
    if (this.props.qryResult && this.props.qryResult.row)
    {
      html = "";
      
      // Facet text result/view column mappings
      const columnHeadings = ['trank', 'erank', 'Named Graph', 'Entity URI', 'Title', 'Matched Text'];

      let renderedHeadings = columnHeadings.map(heading => {
        return `<th>${heading}</th>`;
      });
      renderedHeadings = `<thead><tr>${renderedHeadings.join('')}</tr></thead>`;

      let rows = this.props.qryResult.row;
      if (!Array.isArray(rows)) // => a single results row
        rows = [rows];
      let renderedRows = rows.map((row) => {
        let renderedCols = row.column.map((col, iCol) => {
          // colStyle prevents word splitting on an erank with a 
          // negative exponent. (The minus sign is interpreted as a hyphen.)
          let colStyle  = '';
          colStyle = iCol === 1 ? 'style="min-width: 8em"' : colStyle;
          colStyle = iCol === 5 ? 'style="min-width: 20em"' : colStyle;
          return `<td ${colStyle}>${renderColVal(col, iCol)}</td>`
        })
        return "<tr>" + renderedCols.join('') + "</tr>";
      })
      renderedRows = `<tbody>${renderedRows.join('')}</tbody>`;

      html = `
      <div>
      <span><em>text / FctRspTxtRslt result:</em></span>` +
        '<table class="table table-sm table-striped">' + 
        renderedHeadings + 
        renderedRows +
        `</table>
        </div>`;

    }
    
    // console.log('FctRspTxtRslt#render: html:', html);
    return ( 
      <div 
      style={componentContainerStyle} 
      dangerouslySetInnerHTML={{__html: html}}>
      </div> );

    function renderColVal(col, iCol) {
      let val;

      switch (iCol) {
        case 0: // trank / text rank
          val = Number(col.keyValue);
          val = Number.isNaN(val) ? 'NaN' : val.toPrecision(5);
          break;
        case 1: // erank / entity rank
          val = Number(col.keyValue);
          val = Number.isNaN(val) ? 'NaN' : val.toPrecision(5);
        break;
        case 2: // g / named graph
          val = col.keyValue;
          break;
        case 3: // entity URI (urn: or http[s]:)
          if (col.keyValue.toString().startsWith('http'))
            val = `<a href="${col.keyValue}">${col["@shortform"]}</a>`;
          else
            val = col.keyValue;
          break;
        case 4: // title
          val = typeof col === 'string' ? col : '';
          break;
        case 5: // matched text / search excerpt
          val = col.toString().replace(/&lt;/g, '<').replace(/&gt;/g, '>');
          break;
      }
      return val;
    }
  }

}
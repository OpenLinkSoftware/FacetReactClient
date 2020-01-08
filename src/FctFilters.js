// A component to display the Facet filters defined by the Facet XML.

import React from 'react';

const componentContainerStyle = {
  listStyle: 'none'
}

export default class FctFilters extends React.Component {

  constructor(props) {
    super(props);
    console.log("FctFilters#constructor: props:", props);
    this.onSetSubjectFocus = props.onSetSubjectFocus;
    this.onDropQueryText = props.onDropQueryText;
    this.onDropQueryFilter = props.onDropQueryFilter;

    this.subjectClickHndlr = this.subjectClickHndlr.bind(this);
    this.dropTextClickHndlr = this.dropTextClickHndlr.bind(this);
    this.dropFilterClickHndlr = this.dropFilterClickHndlr.bind(this);
  }

  subjectClickHndlr(subjectId, e) {
    this.onSetSubjectFocus(subjectId);
  }

  dropTextClickHndlr(e) {
    this.onDropQueryText();
  }

  dropFilterClickHndlr(filterId, e) {
    console.log('dropFilterClickHndlr: filterId:', filterId)
    this.onDropQueryFilter(filterId);
  }

  // TO DO: Remove
  dummyData() {
    let rFilterDescs = [
      {
        s: { type: "variable", value: "?s1" },
        p: { type: "operator", value: "is a" },
        o: { type: "uri", value: "http://schema.org/Business", curie: "schema:Business"}
      },
      {
        s: { type: "variable", value: "?s1" },
        p: { type: "uri", value: "http://schema.org/makesOffer", curie: "schema:makesOffer" },
        o: { type: "variable", value: "?s2"}
      },
      {
        s: { type: "variable", value: "?s2" },
        p: { type: "uri", value: "http://schema.org/businessFunction", curie: "schema:businessFunction" },
        o: { type: "variable", value: "?s3"}
      },
      {
        s: { type: "variable", value: "?s3" },
        p: { type: "operator", value: "==" },
        o: { type: "uri", value: "http://purl.org/goodrelations/v1#Dispose", curie: "gr:Dispose" }
      },
      {
        s: { type: "variable", value: "?s2" },
        p: { type: "uri", value: "http://schema.org/itemOffered", curie: "schema:itemOffered"},
        o: { type: "variable", value: "?s4" }
      },
      {
        s: { type: "variable", value: "?s4" },
        p: { type: "operator", value: "is a"},
        o: { type: "variable", value: "?s4" }
      }, 
      {
        s: { type: "variable", value: "?s4" },
        p: { type: "uri", value: "http://schema.org/material", curie: "schema:material"},
        o: { type: "variable", value: "?s5" }
      },
      {
        s: { type: "variable", value: "?s5" },
        p: { type: "operator", value: "==" },
        o: { type: "literal", value: "asbestos" }
      }
    ];

    return rFilterDescs;
  }

  render() {
    const subjectHtml = (subjDesc, i) => {
      // type ::= variable
      if (subjDesc.type === 'variable') {
        let rMatch = /\d+/.exec(subjDesc.value);
        let subjIndx = rMatch ? Number(rMatch[0]) : 0;
        let title = `Set focus to ${subjDesc.value}`;
        return <a href="#" title={title}
          onClick={(e) => this.subjectClickHndlr(subjIndx, e)}>{subjDesc.value}</a>
      }
      else
        throw new Error(`Unexpected subjDesc.type (${subjDesc.type})`);
    };

    const predicateHtml = (predDesc, i) => {
      // type ::= uri | operator
      if (predDesc.type === 'uri') {
        if (predDesc.curie) {
          return <a href={predDesc.value}>{predDesc.curie}</a>
        }
        else {
          return <a href={predDesc.value}>{predDesc.value}</a>
        }
      }
      else if (predDesc.type === 'operator') {
        return <span>{predDesc.value}</span>
      }
      else
        throw new Error(`Unexpected predDesc.type (${predDesc.type})`);
    };

    const objectHtml = (objDesc, i) => {
      // type ::= variable | uri | literal
      if (objDesc.type === 'variable') {
        let rMatch = /\d+/.exec(objDesc.value);
        let objIndx = rMatch ? Number(rMatch[0]) : 0;
        let title = `Set focus to ${objDesc.value}`;
        return <a href="#" title={title}
          onClick={(e) => this.subjectClickHndlr(objIndx, e)}>{objDesc.value}</a>
      }
      else if (objDesc.type === 'uri') {
        if (objDesc.curie) {
          return <a href={objDesc.value}>{objDesc.curie}</a>
        }
        else {
          return <a href={objDesc.value}>{objDesc.value}</a>
        }
      }
      else if (objDesc.type === 'literal') {
        let literal = `"${objDesc.value}"`;
        return <span>{literal}</span>
      }
      else
        throw new Error(`Unexpected objDesc.type (${objDesc.type})`);
    };

    const rFilterDescs = this.dummyData(); // TO DO: Remove
    const filters = rFilterDescs.map((filterDesc, i) => {
      let filterHtml = [];
      filterHtml.push(subjectHtml(filterDesc.s, i));
      filterHtml.push(<>&nbsp;</>);
      filterHtml.push(predicateHtml(filterDesc.p, i));
      filterHtml.push(<>&nbsp;</>);
      filterHtml.push(objectHtml(filterDesc.o, i));
      filterHtml.push(<>&nbsp;</>);

      const dfSpanStyle = { color: 'gray' };
      const dropFilterHtml =
        <a href="#" title="Drop filter" onClick={(e) => this.dropFilterClickHndlr(i, e)}>
          <span className="oi oi-circle-x" style={dfSpanStyle}></span>
        </a>
      return (
        <tr>
          <td>{filterHtml}</td>
          <td>{dropFilterHtml}</td>
        </tr>
      );
    });

    return (
      <div class="col ml-3">
        <table className="table-sm table-hover">
          <tbody>
            {filters}
          </tbody>
        </table>
        </div>
    );
  }
}
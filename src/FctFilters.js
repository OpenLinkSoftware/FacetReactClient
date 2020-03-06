// A component to display the Facet filters defined by the Facet XML.

import React from 'react';
import { Link } from 'react-router-dom';

import FctUiUtil from './FctUiUtil'; 

export default class FctFilters extends React.Component {

  constructor(props) {
    super(props);
    this.onSetSubjectFocus = props.onSetSubjectFocus;
    this.onDropQueryText = props.onDropQueryText;
    this.onDropQueryFilter = props.onDropQueryFilter;

    this.subjectClickHndlr = this.subjectClickHndlr.bind(this);
    this.dropTextClickHndlr = this.dropTextClickHndlr.bind(this);
    this.dropFilterClickHndlr = this.dropFilterClickHndlr.bind(this);

    this.fctUiUtil = new FctUiUtil(this.props.tripleTerminology);
  }

  subjectClickHndlr(subjectId, e) {
    // e.preventDefault();
    this.onSetSubjectFocus(subjectId);
  }

  dropTextClickHndlr(e) {
    // e.preventDefault();
    this.onDropQueryText();
  }

  dropFilterClickHndlr(filterId, e) {
    e.preventDefault();
    // console.log('dropFilterClickHndlr: filterId:', filterId)
    this.onDropQueryFilter(filterId);
  }

  render() {
    const subjectHtml = (subjDesc, iFilter, rActionDesc) => {
      // type ::= variable
      // variable values ::= ?$1, ?$2, ?$3, ...

      if (subjDesc.type === 'variable') {
        let rMatch = /\d+/.exec(subjDesc.value);
        let subjIndx = rMatch ? Number(rMatch[0]) : 0;
        let title = `Set focus to ${subjDesc.value}`;
        // TO DO:
        // Set class on <a> to highlight which $s<n> has the focus.
        // The subject has the focus if subjIndx === FctQuery.getViewSubjectIndex()
        //
        // Equivalent to:
        // /fct/facet.vsp?cmd=set_focus&sid=%d&n=%d
        return <a href="/" title={title}
          onClick={(e) => this.subjectClickHndlr(subjIndx, e)}>{subjDesc.value}</a>
      }
      else
        throw new Error(`Unexpected subjDesc.type (${subjDesc.type})`);
    };

    const predicateHtml = (predDesc, iFilter, rActionDesc) => {
      // console.log('predicateHtml()');
      // TO DO: Move these comments to FctQuery
      //
      // type ::= uri | operator
      // operator values ::= 
      //     'is [not a]'
      //  |  'has [[<propertyUri>]] containing text'
      //  |  'is the {{subjectTerm}} of any [[action<n>|{{predicateTerm}}]] where the {{objectTerm}} is associated with'
      //       (where action<n> is 'set view to text-properties')
      //  |  'is the {{objectTerm}} of any [[action<n>|{{predicateTerm}}]] where the {{subjectTerm}} is associated with'
      //       (where action<n> is 'set view to text-properties')
      //  |  'has [[action<n>|any {{predicateTerm}}]] with {{objectTerm}}'
      //       (where action<n> is 'set view to text-properties')
      //  | '[does not have property] [[<propertyUri>]]'
      //  | '=' | '<' | '<=' | '>' | '>='
      //
      //  The permitted values for operator use placeholders to try to decouple the Facet XML
      //  manipulation and description done by FctQuery from the Facet UI. The Facet UI, and
      //  this class FctFilters, are responsible for replacing these placeholders with the 
      //  appropriate values. The placeholders can take the forms described below.
      //
      //  {{(subject|predicate|object)Term}} is a placeholder to be replaced by the appropriate
      //  term depending on the terminology setting ('spo' or 'eav') being used by Facet. 
      //  (see FctUiUtil)
      //    subjectTerm ::= subject | entity
      //    predicateTerm ::= predicate | attribute
      //    objectTerm  ::= object | value
      // 
      //  [<text>] identifies optional text which may or may not be present depending on the filter 
      //  definition in the Facet XML.
      //
      //  [[<propertyUri>]] is a placeholder to be replaced by an <a> element.
      //  The anchor text is to be <propertyUri> or a corresponding curie. 
      //  The href is to be <propertyUri> or that of a viewer to display the description of <propertyUri>.
      //  [[action<n>|label]] is a placeholder to be replaced by an <a> element.
      //  The anchor text is to be <label>, and the action associated with the href or click handler
      //  to be that described by entry action[n], an action descriptor in an accompanying 'actions' array.
      //
      // Recognized actions:
      //   - 'setFocus'
      //       Not set through an action[n] entry.
      //       Implicit action when a ?$n link is clicked.
      //   - 'setView'
      //       Set through an action[n] entry.
      //       viewType ::= text-properties|text|classes|properties|properties-in|list-count|list|full-text 
      //   - TO DO: others to be added? - see the corresponding facet.vsp cmd's below.
      // 
      // facet.vsp actions to be replicated in FacetReactClient:
      //    - /fct/facet.vsp?cmd=text
      //    - /fct/facet.vsp?cmd=set_focus&n=%d
      //    - /fct/facet.vsp?cmd=set_view&type=%s&limit=%d&offset=0
      //    - /fct/facet.vsp?cmd=refresh
      //    - /fct/facet.vsp?cmd=set_inf - Set inference context
      //    - /fct/facet.vsp?cmd=drop&n=%d
      //    - /fct/facet.vsp?cmd=drop_cond&cno=%d
      //    - /fct/facet.vsp?cmd=drop_text
      //    - /fct/facet.vsp?cmd=drop_text_prop
      //

      if (predDesc.type === 'uri') {
        if (predDesc.curie) {
          return <a href={predDesc.value}>{predDesc.curie}</a>
        }
        else {
          return <a href={predDesc.value}>{predDesc.value}</a>
        }
      }
      else if (predDesc.type === 'operator') {
        // rHtml is any array of React fragments.
        // It is a deconstruction of the predDesc.value containing
        // the original text of the value, split into substrings, 
        // interspersed with React elements/HTML which have been 
        // injected to replace placeholders.
        let rHtml = [];
        
        // Replace {{(subject|predicate|object)Term}} placeholders
        let op = predDesc.value;
        op = op.replace(/\{\{subjectTerm\}\}/g, this.fctUiUtil.fctSubjectTerm());
        op = op.replace(/\{\{predicateTerm\}\}/g, this.fctUiUtil.fctPredicateTerm());
        op = op.replace(/\{\{objectTerm\}\}/g, this.fctUiUtil.fctObjectTerm());

        // console.log('op:', op);

        // Replace [[<propertyUri>]] placeholders
        let rMatchedPlaceholders = op.match(/(\[\[[^|\]]+\]\])/g);
        if (rMatchedPlaceholders) {
          // console.log('predicateHtml(): Replacing [[<propertyUri>]] placeholders')
          let propertyLinks = [];
          let tmp = op;

          for (const ph of rMatchedPlaceholders) {
            let propertyUri = ph.match(/\[\[(.+)\]\]/)[1];
            let propertyCurie = propertyUri; // TO DO: Get this from the predDesc
            propertyLinks.push(<a href={propertyUri}>{propertyCurie}</a>);
            tmp = tmp.replace(ph, `!!${propertyUri}!!`);
          }

          let fragments = tmp.split('!!');
          for (let f of fragments) {
            if (rMatchedPlaceholders.includes(`[[${f}]]`))
              rHtml.push(propertyLinks.shift());
            else
              rHtml.push(f);
          }
        }

        if (rHtml.length == 0) // No placeholders found yet.
          rHtml.push(op);

        // Replace [[action<n>|label]] placeholders
        rMatchedPlaceholders = [];
        for (let [i, val] of rHtml.entries()) {
          // Ignore React elements already added to rHtml.
          // These React elements are for already transformed
          // [[<propertyUri>]] placeholders.
          // Just inspect the strings for [[action<n>|label]] placeholders.
          if (typeof val === 'string') {  
            rMatchedPlaceholders = val.match(/\[\[action\d+\|[^\]]+\]\]/g);
            if (rMatchedPlaceholders) {
              // console.log('predicateHtml(): Replacing [[action<n>|label]] placeholders');
              // console.log('rMatchedPlaceholders:', rMatchedPlaceholders);
              let actionLinks = [];
              let tmp = val;

              for (const ph of rMatchedPlaceholders) {
                let phContent = ph.match(/\[\[(.*)\]\]/)[1];
                let rMatch = phContent.match(/action(\d+)\|(.*)/);
                let actionId = Number(rMatch[1]);
                let actionLabel = rMatch[2];
                // console.log('ph:', ph);
                // console.log('rMatch:', rMatch);
                // console.log('rActionDesc:', rActionDesc);
                // console.log('actionId:', actionId);
                // console.log('actionLabel:', actionLabel);
                
                // TO DO: Build action URI from action[actionId] descriptor.
                let actionDesc = rActionDesc[actionId];
                let actionUri = this.buildActionUri(actionDesc);
                
                // actionLinks.push(<a href={actionUri}>{actionLabel}</a>);
                actionLinks.push(<Link to={actionUri}>{actionLabel}</Link>);
                tmp = tmp.replace(ph, `!!${phContent}!!`);
              }

              let fragments = tmp.split('!!');
              rHtml[i] = [];
              for (let f of fragments) {
                if (rMatchedPlaceholders.includes(`[[${f}]]`))
                  rHtml[i].push(actionLinks.shift());
                else
                  rHtml[i].push(f);
              }
            }
          }
        }
        return rHtml;
      }
      else
        throw new Error(`Unexpected predDesc.type (${predDesc.type})`);
    };

    const objectHtml = (objDesc, iFilter, rActionDesc) => {
      // type ::= variable | uri | literal | number
      // variable values ::= ?$1, ?$2, ?$3, ...
      
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
      else if (objDesc.type === 'number') {
      return <span>{objDesc.value}</span>
      }
      else
        throw new Error(`Unexpected objDesc.type (${objDesc.type})`);
    };

    // console.log('FctFilters#render: this.props.qryFilters.length:', this.props.qryFilters.length);
    const filters = this.props.qryFilters.map((filterDesc, i) => {
      let filterHtml = [];
      filterHtml.push(subjectHtml(filterDesc.s, i, filterDesc.actions));
      filterHtml.push(<>&nbsp;</>);
      filterHtml.push(predicateHtml(filterDesc.p, i, filterDesc.actions));
      filterHtml.push(<>&nbsp;</>);
      filterHtml.push(objectHtml(filterDesc.o, i, filterDesc.actions));
      filterHtml.push(<>&nbsp;</>);

      // Note:
      // Two possible ways of handling 'drop filter condition' clicks are:
      // 1) Attach a click handler to the link and use e.preventDefault()
      // 2) Post back to the page with an action parameter, e.g. '/?action=dropFilter&...'
      // Here we use option 1.
      const dfSpanStyle = { color: 'gray' };
      const dropFilterHtml =
        <a href="/" title="Drop filter" onClick={(e) => this.dropFilterClickHndlr(i, e)}>
          <span className="oi oi-circle-x" style={dfSpanStyle}></span>
        </a>
      return (
        <tr key={`filter-${i}`}>
          <td key={`filter-${i}1`}>{filterHtml}</td>
          <td key={`filter-${i}2`}>{dropFilterHtml}</td>
        </tr>
      );
    });

    return (
      <div className="col ml-3">
        <table className="table-sm table-hover">
          <tbody>
            {filters}
          </tbody>
        </table>
        </div>
    );
  }

  /**
   * Builds a URI which will be the target of a filter action.
   * The URI is built from a generic action descriptor which
   * is independent of the UI implementation.
   */
  buildActionUri(actionDesc)
  {
    // const rootPath = '/facet/';
    // let path = `${rootPath}${actionDesc.action}`;
    // let queryString = '';
    // if (actionDesc.args) {
    //   queryString = '?';
    //   for (const arg in actionDesc.args) {
    //     queryString += `${arg}=${actionDesc.args[arg]}&`;
    //   }
    //   queryString = queryString.slice(0, -1);
    // }

    const path = '/';
    let queryString = `?action=${actionDesc.action}`;
    if (actionDesc.args) {
      for (const arg in actionDesc.args) {
        queryString += `&${arg}=${actionDesc.args[arg]}`;
      }
    }
    return `${path}${queryString}`;
  }

}
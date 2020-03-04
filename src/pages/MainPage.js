import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import qs from 'qs'

import FctClient from '../FctClient';

// Acts as a basic controller performing input URL deconstruction
//
// Equivalent /fct cmd query string parameter values:
// set_view, set_focus, text, next, previous, go_to, set_text_property, open_property
// open_property_of, drop, drop_cond, drop_text_prop, drop_text, set_class, open,
// refresh, set_inf, set_agg, select_value, cond, save, save_init, featured, set_loc

export default function MainPage({location}) {
  let action = {};
  let qryStrParams;
  console.log('MainPage#location: ', JSON.stringify(location, null, 2));
  if (location.search) {
    qryStrParams = qs.parse(location.search, { ignoreQueryPrefix: true });
  }
  console.log(`MainPage#path: ${location.pathname} qs params object:`, qryStrParams);

  if (qryStrParams) { // Update the UI in response to user interaction
    if (qryStrParams.action) {

      // action.ts is used to force a refresh in FctClient#componentDidUpdate
      // when a link with the same href is followed on two different occasions
      // but with a completely different Facet input XML on each visit
      // to the link.
      // e.g. an 'any attribute' link:
      // /?action=setView&viewType=text-properties&...
      // could be followed on two separation occasions, between two searches using completely
      // different search text.

      switch (qryStrParams.action) {
        case "setView":
          console.log('MainPage: Action: setView');
          // Example equivalent /fct link
          // View shows: ?s1 has <any Attribute> with Value "skiing" 
          // The <any Attribute> link is:
          // http://localhost:8896/fct/facet.vsp?sid=22&cmd=set_view&type=text-properties&limit=20&offset=0&cno=0
          action.viewType = qryStrParams.viewType;
          action.ts = new Date().getTime(); 
          // TO DO: Act on limit, offset and cno query string params
          break;
        case "setTextProperty":
          console.log('MainPage: Action: setTextProperty');
          // Example equivalent /fct link:
          // View shows: ?s1 has any Attribute with Value "skiing"
          // The href under the first attribute (http://www.openlinks.../schema#description) is:
          // http://linkeddata.uriburner.com/fct/facet.vsp?
          //   cmd=set_text_property&
          //   iri=http%3A%2F%2Fwww.openlinksw.com%2Fski_resorts%2Fschema%23description&
          //   lang=&datatype=uri&sid=22
          // Equivalent to /fct PL routine fct_set_text_property()
          //
          // Set Facet input XML as follows:
          // - Set <text> element attribute @property-iri to iri qs param.
          // - Set view type to text-d.
          action.viewType = 'text-d';
          action.action = {
              name: qryStrParams.action,
              propertyIri: qryStrParams.iri
            };
          action.ts = new Date().getTime(); 
          break;
        case "openProperty":
          console.log('MainPage: Action: openProperty');
          // Example equivalent /fct link:
          // View shows: ?s1 has [[any Attribute]] with Value "skiing"
          // Click on the above [[any Attribute]] link
          // Click on attribute skiresort:description
          // View shows: ?s1 has [[skiresort:description]] containing text "skiing"
          // Click on Attributes in the sidebar
          // The href under the attribute skiresort:advanced_slopes is:
          // http://linkeddata.uriburner.com/fct/facet.vsp?
          //   cmd=open_property&
          //   iri=http%3A%2F%2Fwww.openlinksw.com%2Fski_resorts%2Fschema%23advanced_slopes&
          //   lang=&datatype=uri&sid=732828
          // Equivalent to /fct PL routine fct_open_property()
          //
          // Example XML:
          // <?xml version="1.0" encoding="ISO-8859-1" ?>
          // <query inference="" invfp="IFP_OFF" same-as="SAME_AS_OFF" view3="" s-term="" c-term="" agg="" limit="20">
          //   <text property="http://www.openlinksw.com/ski_resorts/schema#description">skiing</text>
          //   <property iri="http://www.openlinksw.com/ski_resorts/schema#advanced_slopes">
          //     <view type="list" limit="20" offset="0" />
          //   </property>
          // </query>
          action.viewType = 'list';
          action.action = {
            name: qryStrParams.action,
            propertyIri: qryStrParams.iri,
            excludeProperty: false,
            };
          action.ts = new Date().getTime();
          break;
        case "cond":
          console.log('MainPage: Action: cond');
          // Example equivalent /fct link:
          // http://linkeddata.uriburner.com/fct/facet.vsp?
          //   cmd=cond&cond_t=eq&val=2&lang=&
          //   datatype=http%3A%2F%2Fwww.w3.org%2F2001%2FXMLSchema%23integer&sid=883402
          // Equivalent to /fct PL routines:
          // fct_set_cond(), fct_set_cond_in(), fct_set_cond_near(), fct_set_cond_range()
          switch (qryStrParams.cond_t) {
            case "eq":
            case "neq":
            case "gt":
            case "gte":
            case "lt":
            case "lte":
              action.viewType = 'text-d';
              action.action = {
                name: qryStrParams.action,
                conditionType: qryStrParams.cond_t,
                value: qryStrParams.val,
                valueDataType: qryStrParams.dataType,
                valueLang: qryStrParams.lang,
                negate: (qryStrParams.neg ? true : false)
              };
              action.ts = new Date().getTime();
              break;
            case "in":
            case "not_in":
            case "range":
            case "neg_range":
            case "near":
              throw new Error("Condition type (cond_t) not yet implemented:", qryStrParams.cond_t);
            default:
              throw new Error("Unrecognized condition type (cond_t):", qryStrParams.cond_t);
          }
          break;
        default:
          throw new Error("Unrecognized action:", qryStrParams.action);
      }
    }
  }
  else // Set up the initial default state of the UI
  {
    // action.viewType = "classes"; // FIXME - Remove - Not necessary, constructor will set defaults
  }

  return (
    <div className="container">
      <h2>Facets Components - Test page</h2>
        <FctClient {...action}></FctClient>
    </div>
  )
}
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import qs from 'qs'

import FctClient from '../FctClient';

//
// PlainComponentsPage
// 
// The FacetReactClient essentially allows a user to refine successive
// views of a query result, iteratively narrowing the scope of the search
// and the result set.
//
// User interaction with FacetReactClient is through UI (HTML form) controls
// or through HTML links in the displayed Facet view. Interaction through the
// UI controls is managed by handler functions exposed by FctClient. Interaction 
// through Facet view links is managed here by PlainComponentsPage.
//
// The view links mainly identify Facet actions to be executed. An action is
// specified through a query string attached to the link URL. PlainComponentsPage 
// acts as a basic controller, deconstructing the link URL received through the
// location property, identifying any action parameters in the query string and
// building an action descriptor object. The action descriptor is then passed 
// destructured to FctClient for it to act on.
//
// The query string parameters used by FacetReactClient to describe actions are 
// equivalent to those used by the original /fct service. 
//
// Equivalent /fct service query string parameter values:
// set_view, set_focus, text, next, previous, go_to, set_text_property, open_property
// open_property_of, drop, drop_cond, drop_text_prop, drop_text, set_class, open,
// refresh, set_inf, set_agg, select_value, cond, save, save_init, featured, set_loc
//

export default function PlainComponentsPage({location}) {
  let action = {};
  let qryStrParams;
  console.log('PlainComponentsPage#location: ', JSON.stringify(location, null, 2));
  if (location.search) {
    qryStrParams = qs.parse(location.search, { ignoreQueryPrefix: true });
  }
  console.log(`PlainComponentsPage#path: ${location.pathname} qs params object:`, qryStrParams);

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
          console.log('PlainComponentsPage: Action: setView');
          // Example equivalent /fct link
          // View shows: ?s1 has <any Attribute> with Value "skiing" 
          // The <any Attribute> link is:
          // http://linkeddata.uriburner.com/fct/facet.vsp?
          //   cmd=set_view&
          //   type=text-properties&limit=20&offset=0&cno=0
          //   &sid=22
          action.viewType = qryStrParams.viewType;
          action.ts = new Date().getTime(); 
          // TO DO: Act on limit, offset and cno query string params
          break;
        case "setTextProperty":
          console.log('PlainComponentsPage: Action: setTextProperty');
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
          console.log('PlainComponentsPage: Action: openProperty');
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
          // Equivalent to /fct PL routine fct_open_property(...,'property',)
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
            excludeProperty: false,         // TO DO: Retrieve from query string
            };
          action.ts = new Date().getTime();
          break;
        case "openPropertyOf":
          console.log('PlainComponentsPage: Action: openPropertyOf');
          // Example equivalent /fct link:
          // View shows: ?s1 has [[any Attribute]] with Value "linked+data"
          // Click on Values in the sidebar
          // View shows: ?s1 is the Value of [[any Attribute]] where the Entity is associated with "linked+data"
          // The href under the attribute madeTweet is:
          // http://linkeddata.uriburner.com/fct/facet.vsp?
          //   cmd=open_property_of&
          //   iri=http%3A%2F%2Fwww.openlinksw.com%2Fschemas%2Ftwitter%23madeTweet&
          //   lang=&datatype=uri&sid=965838
          // Equivalent to /fct PL routine fct_open_property(...,'property-of',)
          action.viewType = 'list';
          action.action = {
            name: qryStrParams.action,
            propertyIri: qryStrParams.iri,
            excludeProperty: false,         // TO DO: Retrieve from query string
            };
          action.ts = new Date().getTime();
          break;
        case "cond":
          console.log('PlainComponentsPage: Action: cond');
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
        case "setClass":
          console.log('PlainComponentsPage: Action: setClass');
          // Example equivalent /fct link
          // http://linkeddata.uriburner.com/fct/facet.vsp?
          //   cmd=set_class&
          //   iri=http%3A%2F%2Fwww.openlinksw.com%2Fski_resorts%2Fschema%23SkiResort&
          //   lang=&datatype=uri&sid=901795
          action.viewType = 'text-d';
          action.action =  {
            name: qryStrParams.action, 
            classIri: qryStrParams.iri, 
            // dataType,
            // lang
          };
          action.ts = new Date().getTime();
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
    <FctClient location={location} {...action}></FctClient>
  )
}
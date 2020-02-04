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
          // Example equivalent /fct link
          // View shows: ?s1 has <any Attribute> with Value "skiing" 
          // The <any Attribute> link is:
          // http://localhost:8896/fct/facet.vsp?sid=22&cmd=set_view&type=text-properties&limit=20&offset=0&cno=0
          console.log('MainPage: Action: setView');
          action.viewType = qryStrParams.viewType;
          action.ts = new Date().getTime(); 
          // TO DO: Act on limit, offset and cno query string params
          break;
        case "setTextProperty":
          // Example equivalent /fct link
          // View shows: ?s1 has any Attribute with Value "skiing"
          // The href under the first attribute (http://www.openlinks.../schema#description) is:
          // http://localhost:8896/fct/facet.vsp?
          //   cmd=set_text_property&
          //   iri=http%3A%2F%2Fwww.openlinksw.com%2Fski_resorts%2Fschema%23description&
          //   lang=&datatype=uri&sid=22
          // Equivalent to /fct PL routine fct_set_text_property()
          console.log('MainPage: Action: setTextProperty');
          // Set XML:
          // - Set <text> element attribute @property-iri to iri qs param.
          // - Set view type to text-d.
          action.viewType = 'text-d';
          action.action = {
              name: "setTextProperty",
              propertyIri: qryStrParams.iri
            };
          action.ts = new Date().getTime(); 
          break;
        case "openProperty":
          console.log('MainPage: Action: openProperty: TO DO');
          break;
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
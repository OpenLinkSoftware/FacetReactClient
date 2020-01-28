import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import qs from 'qs'

import FctClient from '../FctClient';

// Acts as a basic controller performing input URL deconstruction
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
      switch (qryStrParams.action) {
        case "setView":
          console.log('MainPage: TO DO: Action: setView');
          action.viewType = "text-properties"; // FIX ME
          break;
        case "set_text_property":
          console.log('MainPage: TO DO: Action: set_text_property');
          break
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
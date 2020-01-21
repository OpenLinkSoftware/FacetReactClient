import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import qs from 'qs'

import FctClient from '../FctClient';

export default function MainPage({location}) {
  let qryStrParams;
  console.log('location: ', JSON.stringify(location, null, 2));
  if (location.search) {
    qryStrParams = qs.parse(location.search, { ignoreQueryPrefix: true });
  }
  console.log(`Path: ${location.pathname} qs:`, qryStrParams);

  if (qryStrParams && qryStrParams.action) {
    switch (qryStrParams.action) {
      case "setView":
        console.log('TO DO: Action: setView');
        break;
    }
  }

  return (
    <div className="container">
      <h2>Facets Components - Test page</h2>
        <FctClient></FctClient>
    </div>
  )
}
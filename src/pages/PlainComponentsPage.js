import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import FctClient from '../FctClient';

export default function PlainComponentsPage({ location, action }) {
  console.log('PlainComponentsPage#location: ', JSON.stringify(location, null, 2));
  console.log('PlainComponentsPage#action: ', JSON.stringify(action, null, 2));

  return (
    <FctClient location={location} {...action}></FctClient>
  )
}

import React from 'react';
import FctNavBar from '../FctNavBar'
import FctFooter from '../FctFooter'

export default function AboutPage(props) {
  return (
    <>
    <FctNavBar />
    <div className="container-fluid">
      <h3>About</h3>
      <FctFooter />
    </div>
    </>
  )
}

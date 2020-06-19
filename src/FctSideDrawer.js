import React from 'react';

const FctSideDrawer = props => {
  let drawerClasses = 'side-drawer';
  if (props.show) {
    drawerClasses = 'side-drawer open';
  }
  return (
  <nav className={drawerClasses}>
    <h3>Settings</h3>
    <h4>Entity Relationship Filters</h4>
    <ul>
      <li><a href="/">Type</a></li>
      <li><a href="/">Attributes</a></li>
      <li><a href="/">Values</a></li>
      <li><a href="/">Distinct (Count)</a></li>
      <li><a href="/">Show Matching Entities</a></li>
      <li><a href="/">Places</a></li>
    </ul>
    <hr/>
    <ul>
      <li><a href="/">Options</a></li>
      <li><a href="/">Save</a></li>
      <li><a href="/">Featured Queries</a></li>
      <li><a href="/">New Search</a></li>
    </ul>
  </nav>
)
};

export default FctSideDrawer;
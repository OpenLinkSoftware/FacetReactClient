import React from 'react';

const FctSideDrawer = props => {
  let drawerClasses = 'side-drawer';
  if (props.show) {
    drawerClasses = 'side-drawer open';
  }
  return (
  <nav className={drawerClasses}>
    <ul>
      <li><a href="/">Products</a></li>
      <li><a href="/">Users</a></li>
    </ul>
  </nav>
)
};

export default FctSideDrawer;
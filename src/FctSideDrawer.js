import React from 'react';
import { Link } from 'react-router-dom'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import { FctClientConsumer } from './FctClientContext'

const FctSideDrawer = props => {
  let drawerClasses = 'side-drawer';
  if (props.show) {
    drawerClasses = 'side-drawer open';
  }
  return (
    <nav className={drawerClasses} id="sidebar">
      <div className="sidebar-header">
        <h3>Settings</h3>
      </div>
      <div>
        <ul className="list-unstyled components">
          <li style={{ borderTop: "solid 1px white", clear: "both" }}>

            <div className="sidebar-headerX">
              <span className="subheader"><strong>Entity Relationship Filters</strong></span>
            </div>
          </li>
          <li>
            <OverlayTrigger
              placement={'right'}
              overlay={<Tooltip>Entity category or class</Tooltip>}
            >
              <Link to="#">Type</Link>
            </OverlayTrigger>
          </li>
          <li>
            <OverlayTrigger
              placement={'right'}
              overlay={<Tooltip>Relationships for which selected variable denotes relation entity</Tooltip>}
            >
              <Link to="#">Attributes</Link>
            </OverlayTrigger>
          </li>
          <li>
            <OverlayTrigger
              placement={'right'}
              overlay={<Tooltip>Relationships for which select variable denotes relation value</Tooltip>}
            >
              <Link to="#">Values</Link>
            </OverlayTrigger>
          </li>
          <li>
            <OverlayTrigger
              placement={'right'}
              overlay={<Tooltip>List of distinct entity types ordered by count</Tooltip>}
            >
              <Link to="#">Distinct (Count)</Link>
            </OverlayTrigger>
          </li>
          <li>
            <OverlayTrigger
              placement={'right'}
              overlay={<Tooltip>Display ranked entity names and text summaries</Tooltip>}
            >
              <Link to="#">Show Matching Entities</Link>
            </OverlayTrigger>
          </li>
          <li>
            <OverlayTrigger
              placement={'right'}
              overlay={<Tooltip>Geospatial entities projected over map overlays</Tooltip>}
            >
              <Link to="#">Places</Link>
            </OverlayTrigger>
          </li>
          <li style={{ borderTop: "solid 1px white", clear: "both" }}><Link to="#">Save</Link></li>
          <li>
            <FctClientConsumer>
              {({fctClient}) => ( <Link to="/" onClick={() => fctClient.handleNewSearchRequest()}>New Search</Link> )}
            </FctClientConsumer>
          </li>
          <li style={{ borderTop: "solid 1px white", clear: "both" }}><Link to="#">Options</Link></li>
          <li><Link to="#">Featured Queries</Link></li>
          <li><Link to="#">Demo Queries</Link></li>
        </ul>
      </div>
    </nav>
  )
};

export default FctSideDrawer;


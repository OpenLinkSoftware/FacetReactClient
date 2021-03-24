import React from 'react';
import { Link } from 'react-router-dom'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import { FctClientConsumer } from './FctClientContext'

const FctSideDrawer = props => {
  let drawerClasses = 'sidebar side-drawer';
  if (!props.staticSideDrawer) {
    drawerClasses += ' side-drawer-dynamic';
  }
  if (props.show) {
    drawerClasses += ' open';
  }

  // Only display the following sidebar links when on the search results page.
  // Otherwise hide them.
  //  - Entity Relation Filters
  //    - Type
  //    - Attributes
  //    - Values
  //    - Distinct (Count)
  //    - Matching Entities
  //    - Places
  //  - Save
  //  - New Search

  // Note - Tooltip implementation:
  //
  // Wrapping a Link with OverlayTrigger to provide a tooltip
  // resulted in the tooltip still being visible when the
  // sidebar was closed, at least until a mouse move. 
  //
  // As a workaround, OverlayTrigger instead wraps a
  // question mark icon, so the user is forced to move the
  // focus to the adjacent Link to trigger a sidebar action.
  // Shifting the focus hides the tooltip.

  let contextSensitiveLinks =
    <>
      <li style={{ borderTop: "solid 1px white", clear: "both" }}>

        <div className="sidebar-headerX">
          <span className="subheader"><strong>Entity Filters</strong></span>
        </div>
      </li>
      <li>
        <FctClientConsumer>
          {
            ({ fctClient }) => (
              <>
                <div className="sidebar-link-wrapper">
                  <Link to="#"
                    onClick={() => {
                      fctClient.handleViewChange("classes")
                      props.drawerToggleClickHandler()
                    }}>Type</Link>
                  <OverlayTrigger
                    placement={'right'}
                    overlay={<Tooltip>Entity category or class</Tooltip>}
                  >
                    <span className="oi oi-question-mark sidebar-icon" />
                  </OverlayTrigger>
                </div>
              </>
            )
          }
        </FctClientConsumer>
      </li>
      <li>
        <FctClientConsumer>
          {
            ({ fctClient }) => (
              <>
                <div className="sidebar-link-wrapper">
                  <Link to="#"
                    onClick={() => {
                      fctClient.handleViewChange("properties")
                      props.drawerToggleClickHandler()
                    }}>Attributes</Link>
                  <OverlayTrigger
                    placement={'right'}
                    overlay={<Tooltip>Relationships for which selected variable denotes relation entity</Tooltip>}
                  >
                    <span className="oi oi-question-mark sidebar-icon" />
                  </OverlayTrigger>
                </div>
              </>
            )
          }
        </FctClientConsumer>
      </li>
      <li className>
        <FctClientConsumer>
          {
            ({ fctClient }) => (
              <>
                <div className="sidebar-link-wrapper">
                  <Link to="#"
                    onClick={() => {
                      fctClient.handleViewChange("properties-in")
                      props.drawerToggleClickHandler()
                    }}>Values</Link>
                  <OverlayTrigger
                    placement={'right'}
                    overlay={<Tooltip>Relationships for which select variable denotes relation value</Tooltip>}
                  >
                    <span className="oi oi-question-mark sidebar-icon" />
                  </OverlayTrigger>
                </div>
              </>
            )
          }
        </FctClientConsumer>
      </li>
      <li>
        <FctClientConsumer>
          {
            ({ fctClient }) => (
              <>
                <div className="sidebar-link-wrapper">
                  <Link to="#"
                    onClick={() => {
                      fctClient.handleViewChange("list-count")
                      props.drawerToggleClickHandler()
                    }}>Distinct (Count)</Link>
                  <OverlayTrigger
                    placement={'right'}
                    overlay={<Tooltip>List of distinct entity types ordered by count</Tooltip>}
                  >
                    <span className="oi oi-question-mark sidebar-icon" />
                  </OverlayTrigger>
                </div>
              </>
            )
          }
        </FctClientConsumer>
      </li>
      <li>
        <FctClientConsumer>
          {
            ({ fctClient }) => (
              <>
                <div className="sidebar-link-wrapper">
                  <Link to="#"
                    onClick={() => {
                      fctClient.handleViewChange("text-d")
                      props.drawerToggleClickHandler()
                    }}>Matching Entities</Link>
                  <OverlayTrigger
                    placement={'right'}
                    overlay={<Tooltip>Display ranked entity names and text summaries</Tooltip>}
                  >
                    <span className="oi oi-question-mark sidebar-icon" />
                  </OverlayTrigger>
                </div>
              </>
            )
          }
        </FctClientConsumer>
      </li>
      <li>
        <FctClientConsumer>
          {
            ({ fctClient }) => (
              <>
                <div className="sidebar-link-wrapper">
                  <Link to="#"
                    onClick={() => {
                      // TO DO: Do something!
                      props.drawerToggleClickHandler()
                    }}>Places</Link>
                  <OverlayTrigger
                    placement={'right'}
                    overlay={<Tooltip>Geospatial entities projected over map overlays</Tooltip>}
                  >
                    <span className="oi oi-question-mark sidebar-icon" />
                  </OverlayTrigger>
                </div>
              </>
            )
          }
        </FctClientConsumer>
      </li>
      <li className="sidebar-link-raw" style={{ borderTop: "solid 1px white", clear: "both" }}><Link to="#">Save</Link></li>
      <li className="sidebar-link-raw">
        <FctClientConsumer>
          {({ fctClient }) => (
            <Link to="/" onClick={() => {
              fctClient.handleNewSearchRequest()
              props.drawerToggleClickHandler()
            }}>New Search</Link>)}
        </FctClientConsumer>
      </li>
    </>
    ;

  let contextSensitiveContent, sidebarHeader;
  if (props.currentPageName === "SearchResultsPage") {
    contextSensitiveContent = contextSensitiveLinks;
    sidebarHeader = "Settings & Filters";
  }
  else {
    contextSensitiveContent = <></>;
    sidebarHeader = "Settings";
  }

  let sidebarPinIcon = props.staticSideDrawer ? 'oi oi-lock-locked' : 'oi oi-pin'; // :'oi oi-lock-unlocked';

  return (
    <nav className={drawerClasses}>
      <div style={{ textAlign: "right" }}>
        <OverlayTrigger
          placement={'right'}
          overlay={<Tooltip>Pin Setting/Filters sidebar</Tooltip>}
        >
          <button type="button" className="btn btn-default shadow-none" id="sidebarPin" onClick={() => { props.drawerPinClickHandler() }} >
            <span className={sidebarPinIcon} aria-hidden="true"></span>
          </button>
        </OverlayTrigger>
      </div>

      <div className="sidebar-header">
        <h3>{sidebarHeader}</h3>
      </div>
      <div>
        <ul className="list-unstyled components">
          {contextSensitiveContent}
          <li className="sidebar-link-raw" style={{ borderTop: "solid 1px white", clear: "both" }}><Link to="#">Options</Link></li>
          <li className="sidebar-link-raw"><Link to="#">Featured Queries</Link></li>
          <li className="sidebar-link-raw"><Link to="#">Demo Queries</Link></li>
        </ul>
      </div>
    </nav>
  )
};

export default FctSideDrawer;


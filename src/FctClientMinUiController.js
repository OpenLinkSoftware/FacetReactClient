import React from 'react';
import PlainComponentsPage from './pages/PlainComponentsPage';

export class FctClientMinUiController extends React.Component {
  constructor(props) {
    super(props);
    // TO DO: Instantiate FctClient to hold all Facet related state
  }

  render() {
    return <PlainComponentsPage location={this.props.location} />
  }
}

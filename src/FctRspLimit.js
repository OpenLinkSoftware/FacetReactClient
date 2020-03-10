// A component to set the maximum Facet resultset size.

import React from 'react';

export default class FctRspLimit extends React.Component {

  constructor(props) {
    super(props);
    this.state = { limit: props.limit };
    this.onChange = props.onChange;
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    let limit = Number(event.target.value);
    this.setState({ limit });
    this.onChange(limit);
  }

  render() {
    return (
      <select value={this.state.limit} className="custom-select" onChange={this.handleChange}>
        <option value="0">0 (No limit)</option>
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="50">50</option>
        <option value="100">100</option>
        <option value="500">500</option>
        <option value="1000">1000</option>
        <option value="5000">5000</option>
        <option value="10000">10000</option>
      </select>
    );
  }
}
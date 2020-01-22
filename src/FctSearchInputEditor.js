// A component to capture the inputs for a Facet search.

import React from 'react';

class FctSearchInputEditor extends React.Component {

  constructor(props) {
    super(props);
    this.state = { searchText: props.searchText }; // FIX ME! ANTIPATTERN! See https://reactjs.org/docs/react-component.html
    this.onSearch = props.onSearch;
    this.onChange = props.onChange;

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ searchText: event.target.value }); 
    this.onChange(event.target.value);
  }

  handleSubmit(event) {
    this.onSearch(this.state.searchText);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group row">
          <label htmlFor="searchTxt" className="col-sm-2 col-form-label">Search text:</label>
          <div className="col-sm-5">
            <input type="text" id="searchTxt" className="form-control" value={this.state.searchText} onChange={this.handleChange} />
          </div>
          <button className="btn btn-primary" type="submit">Search</button>
        </div>
      </form>
    );
  }

  static getDerivedStateFromProps(props, state) {
    return { searchText: props.searchText };
  }
}

export { FctSearchInputEditor as default };
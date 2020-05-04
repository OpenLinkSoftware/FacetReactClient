// A component to display a modal dialog reporting an error.
//
// FctErrCntnr displays a FctError object returned by the Facet JS Client.
// These errors come from the Facet client or the server-side Facet service.
//
// FctErrModal displays other errors coming from FacetReactClient. These
// need not be Facet errors. They can come from a other sources, e.g.
// a rendering error caught by a React error boundary.

import React from 'react';
import Modal from "react-bootstrap/Modal";

export default class FctErrModal extends React.Component {

    constructor(props) {
      super(props);
      this.hideErrModal = this.hideErrModal.bind(this);
      this.showErrModal = this.showErrModal.bind(this);
      this.state = { show: this.props.show };
    }

    hideErrModal() {
      this.props.cbClearError();
      this.setState = {show: false};
    }

    showErrModal() {
      this.setState = {show: true};
    }

    render() {
      return (
        <Modal show={this.state.show} onHide={this.hideErrModal}>
          <Modal.Header>Facet Error</Modal.Header>
          <Modal.Body>
            <p>React error boundary hit.<br/>(See console log for details)</p>
            <p>Error:<br/>{this.props.errorMsg}</p>
          </Modal.Body>
          <Modal.Footer>
            <button type="button" className="btn btn-secondary" onClick={this.hideErrModal}>Close</button>
          </Modal.Footer>
        </Modal>
      );
    }

}

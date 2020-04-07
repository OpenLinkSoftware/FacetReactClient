// A component to display a FctError object returned by the Facet JS Client.

import React from 'react';

export default class FctErrCntnr extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let html = null;
    let fctError = this.props.fctError;
    if (fctError) {
      let rErrorFrags = [];
      rErrorFrags.push(
        <li>{fctError.message}</li>
      );

      if (fctError.httpStatusCode || fctError.httpStatusText) {
        rErrorFrags.push(
          <li>HTTP status: {fctError.httpStatusCode} {fctError.httpStatusText}</li>
        );
      }

      if (fctError.responseJson && fctError.responseJson.error) {
        if (fctError.responseJson.error.code) {
          rErrorFrags.push(
            <li>
              Virtuoso error: {fctError.responseJson.error.code}
            </li>
          );
        }

        if (fctError.responseJson.error.message) {
          rErrorFrags.push(
            <li>
              Virtuoso message: {fctError.responseJson.error.message}
            </li>
          );
        }

        if (fctError.responseJson.error.diagnostics) {
          rErrorFrags.push(
            <li>
              Virtuoso diagnostics: {fctError.responseJson.error.diagnostics}
            </li>
          );
        }
      }
      else if (fctError.responseText) {
        rErrorFrags.push(
          <li>responseText: ${fctError.responseText}</li>
        );
      }

      html =
        <>
          <strong>Error:</strong>
          <ul>
            {rErrorFrags}
          </ul>
        </>;
    }

    return html;
  }
}
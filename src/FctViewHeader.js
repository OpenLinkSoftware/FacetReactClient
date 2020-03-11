// A component to display a header describing the results view being displayed.

import React from 'react';

export default function FctViewHeader(props) {

  let viewType = props.qryResult ? props.qryResult["@type"] : null;
  return viewType ? (
    <strong>
      Displaying {props.fctUiUtil.fctViewDescription(viewType, props.queryText, props.viewSubjectIndex)} where:
    </strong>
  ) : "";
}
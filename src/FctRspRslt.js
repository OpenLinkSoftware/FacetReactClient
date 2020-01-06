// A component to display the <fct:result type="{viewtype}"> element of a Facet service response.
// The component is specialized depending on the element's type attribute.

import React from 'react';

import FctRspTxtRslt from './FctRspTxtRslt';
import FctRspClssRslt from './FctRspClssRslt';
import FctRspPrprtsRslt from './FctRspPrprtsRslt';
import FctRspLstCntRslt from './FctRspLstCntRslt';

export default function FctRspRslt(props) {
  const viewType = props.qryResult ? props.qryResult["@type"] : "empty";

  switch (viewType)
  {
    case "text":
      return <FctRspTxtRslt qryResult={props.qryResult} />;
    case "classes":
      return <FctRspClssRslt qryResult={props.qryResult} />;
    case "properties":
      return <FctRspPrprtsRslt qryResult={props.qryResult} />;
    case "list-count":
      return <FctRspLstCntRslt qryResult={props.qryResult} />;
    case "empty":
      return "";
    default:
      throw new Error(`Unrecognized Facet result view type (${viewType})`);
  }
}
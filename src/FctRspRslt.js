// A component to display the <fct:result type="{viewtype}"> element of a Facet service response.
// The component is specialized depending on the element's type attribute.

import React from 'react';

import FctRspTxtRslt from './FctRspTxtRslt';
import FctRspTxtdRslt from './FctRspTxtdRslt';
import FctRspTxtPrprtsRslt from './FctRspTxtPrprtsRslt';
import FctRspClssRslt from './FctRspClssRslt';
import FctRspPrprtsRslt from './FctRspPrprtsRslt';
import FctRspLstCntRslt from './FctRspLstCntRslt';
import FctRspLstRslt from './FctRspLstRslt';
import FctRspPrpVlLstRslt from './FctRspPrpVlLstRslt';

export default function FctRspRslt(props) {
  const viewType = props.qryResult ? props.qryResult["@type"] : "empty";

  switch (viewType)
  {
    case "text":
      return <FctRspTxtRslt qryResult={props.qryResult} />;
    case "text-d":
      return <FctRspTxtdRslt qryResult={props.qryResult} />;
    case "text-properties":
      return <FctRspTxtPrprtsRslt qryResult={props.qryResult} />;
    case "classes":
      return <FctRspClssRslt qryResult={props.qryResult} />;
    case "properties":
      return <FctRspPrprtsRslt qryResult={props.qryResult} />;
    case "propval-list":
      return <FctRspPrpVlLstRslt qryResult={props.qryResult} />;
    case "list":
      return <FctRspLstRslt qryResult={props.qryResult} />;
    case "list-count":
      return <FctRspLstCntRslt qryResult={props.qryResult} />;
    case "empty":
      return "";
    default:
      throw new Error(`Unrecognized Facet result view type (${viewType})`);
  }
}
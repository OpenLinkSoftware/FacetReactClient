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
  let viewType = props.qryResult ? props.qryResult["@type"] : "empty";
  let resultComponent, actionPrompt = "";
  switch (viewType)
  {
    case "text":
      resultComponent = <FctRspTxtRslt qryResult={props.qryResult} />
      break;
    case "text-d":
      resultComponent = <FctRspTxtdRslt qryResult={props.qryResult} />
      break;
    case "text-properties":
      resultComponent = <FctRspTxtPrprtsRslt qryResult={props.qryResult} />
      break;
    case "classes":
      resultComponent = <FctRspClssRslt qryResult={props.qryResult} />
      break;
    case "properties":
      resultComponent = <FctRspPrprtsRslt qryResult={props.qryResult} />
      break;
    case "propval-list":
      resultComponent = <FctRspPrpVlLstRslt qryResult={props.qryResult} />
      break;
    case "list":
      actionPrompt = <strong>Select a value or condition:</strong>;
      resultComponent = <FctRspLstRslt qryResult={props.qryResult} />
      break;
    case "list-count":
      resultComponent = <FctRspLstCntRslt qryResult={props.qryResult} />
      break;
    case "empty":
      resultComponent = "";
      break;
    default:
      throw new Error(`Unrecognized Facet result view type (${viewType})`);
  }

  return <>{actionPrompt}{resultComponent}</>;
}

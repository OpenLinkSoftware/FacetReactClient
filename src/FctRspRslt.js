// A component to display the <fct:result type="{viewtype}"> element of a Facet service response.
// The component is specialized depending on the element's type attribute.

import React from 'react';

import FctRspTxtRslt from './FctRspTxtRslt';
import FctRspTxtdRslt from './FctRspTxtdRslt';
import FctRspTxtPrprtsRslt from './FctRspTxtPrprtsRslt';
import FctRspClssRslt from './FctRspClssRslt';
import FctRspPrprtsRslt from './FctRspPrprtsRslt';
import FctRspPrprtsInRslt from './FctRspPrprtsInRslt';
import FctRspLstCntRslt from './FctRspLstCntRslt';
import FctRspLstRslt from './FctRspLstRslt';
import FctRspPrpVlLstRslt from './FctRspPrpVlLstRslt';

export default function FctRspRslt(props) {
  let viewType = props.qryResult ? props.qryResult["@type"] : "empty";
  let resultComponent, prompt = "";
  switch (viewType)
  {
    case "text":
      // prompt = <strong>Text match results:</strong>;
      resultComponent = <FctRspTxtRslt qryResult={props.qryResult} describeEndpoint={props.describeEndpoint} />
      break;
    case "text-d":
      // prompt = <strong>Text match results:</strong>;
      resultComponent = <FctRspTxtdRslt qryResult={props.qryResult} describeEndpoint={props.describeEndpoint} />
      break;
    case "text-properties":
      // prompt = <strong>List of properties with matching text:</strong>;
      resultComponent = <FctRspTxtPrprtsRslt qryResult={props.qryResult} location={props.location} />
      break;
    case "classes":
      // prompt = <strong>Types:</strong>;
      resultComponent = 
        <FctRspClssRslt 
          qryResult={props.qryResult} 
          describeEndpoint={props.describeEndpoint} 
          fctUiUtil={props.fctUiUtil}
          location={props.location}
        />
      break;
    case "properties":
      // prompt = <strong>Properties:</strong>;
      resultComponent = 
        <FctRspPrprtsRslt 
          qryResult={props.qryResult} 
          describeEndpoint={props.describeEndpoint} 
          fctUiUtil={props.fctUiUtil} 
          location={props.location}
        />
      break;
    case "properties-in":
      // prompt = <strong>Referencing properties:</strong>;
      resultComponent = 
       <FctRspPrprtsInRslt 
         qryResult={props.qryResult} 
         describeEndpoint={props.describeEndpoint} 
         fctUiUtil={props.fctUiUtil} 
         location={props.location}
       />
      break;
    case "propval-list":
      // prompt = <strong>???:</strong>;
      resultComponent = <FctRspPrpVlLstRslt qryResult={props.qryResult} />
      break;
    case "list":
      prompt = <strong>Select a value or condition:</strong>;
      resultComponent = <FctRspLstRslt qryResult={props.qryResult} location={props.location} />
      break;
    case "list-count":
      // prompt = <strong>Distinct values:</strong>;
      resultComponent = <FctRspLstCntRslt qryResult={props.qryResult} />
      break;
    case "empty":
      resultComponent = "";
      break;
    default:
      throw new Error(`Unrecognized Facet result view type (${viewType})`);
  }

  return <>{prompt}{resultComponent}</>;
}

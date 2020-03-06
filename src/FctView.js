// View utility routines

export default class FctView
{
  static fctViewAction(viewType)
  {
    // Equivalent of /fct fct_view_cmd()
    // console.log('fctViewAction: viewType:', viewType);

    let action;
    switch(viewType) {
      case 'text-properties':
        action = 'setTextProperty';
        break;
      case 'properties':
        action = 'openProperty';
        break;
      case 'properties-in':
        action = 'openPropertyOf';
        break;
      case 'classes':
        action = 'setClass';
        break;
      case 'full-text':
        action = 'setText';
        break;
      case 'list-count':
      case 'geo-list':
        action = 'selectValue'
      default:
        action = 'cond';
    }

    return action;
  }

  static fctBuildAction(actionOpts) {
    let path = '/';
    let qs = '?';
    let qsSep = '';
    for (const opt in actionOpts) {
      let optVal = actionOpts[opt];
      if (optVal && (typeof optVal === 'string') && optVal.startsWith('http'))
        optVal = encodeURIComponent(optVal);
      if (!optVal)
        optVal = '';
      qs += `${qsSep}${opt}=${optVal}`;
      qsSep = '&';
    }
    return `${path}${qs}`;
  }
}

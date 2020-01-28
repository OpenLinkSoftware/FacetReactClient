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
        action = 'set_text_property';
        break;
      case 'properties':
        action = 'open_property';
        break;
      case 'properties-in':
        action = 'open_property_of';
        break;
      case 'classes':
        action = 'set_class';
        break;
      case 'full-text':
        action = 'set_text';
        break;
      case 'list-count':
      case 'geo-list':
        action = 'select_value'
      default:
        action = 'cond';
    }

    return action;
  }

  static fctBuildAction(actionOpts) {
    let path = '/';
    let qs = '?';
    qs += `action=${actionOpts.action}`;
    qs += `&iri=${encodeURIComponent(actionOpts.iri)}`;
    qs += `&dataType=${actionOpts.dataType}`;
    return `${path}${qs}`;
  }
}
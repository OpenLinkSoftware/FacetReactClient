// Facet Configuration Settings

const DFLT_FCT_SVC_HOST = 'http://localhost:8896';
// const DFLT_FCT_SVC_HOST = 'http://linkeddata.uriburner.com';
// const DFLT_FCT_SVC_HOST = 'http://ods-qa.openlinksw.com';

const DFLT_VIEW_LIMIT = 50;

export const fctConfig = {
  deploymentBasePath: '/facet',
  getDeploymentBasePath: function () {
    return '' // Use with webpack-dev-server / webpack --mode development
    // return this.deploymentBasePath; // Use with webpack --mode production
  },
  fctSvcPath: '/fct/service',
  getDefaultServiceEndpoint: function() {
    return `${DFLT_FCT_SVC_HOST}${this.fctSvcPath}`;
  },
  describeSvcPath: '/describe/',
  getDefaultDescribeEndpoint: function () {
    return `${DFLT_FCT_SVC_HOST}${this.describeSvcPath}`;
  },
  getDefaultViewLimit: function () {
    return DFLT_VIEW_LIMIT;
  },
}

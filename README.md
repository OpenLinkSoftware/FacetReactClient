# FacetReactClient

2019-Nov-07  
CMSB

A React-based client for the [Virtuoso Faceted Browsing Service](http://vos.openlinksw.com/owiki/wiki/VOS/VirtuosoFacetsWebService).

FacetReactClient uses [FacetJsClient](https://github.com/OpenLinkSoftware/FacetJsClient) for communicating with the Faceted Browsing Service's /fct/service endpoint.

See also:

* branch [develop](https://github.com/OpenLinkSoftware/FacetReactClient/tree/develop)
* [FacetReactClientDeploy](https://github.com/OpenLinkSoftware/FacetReactClientDeploy)

## Deployment

Before building an app-bundle.js for use with FacetReactClientDeploy, edit `FctConfig.js` to set the Facet Service host to be used by the deployed FacetReactClient. In `FctConfig.js`, ensure `deploymentBasePath` is set to `'/facet'`.

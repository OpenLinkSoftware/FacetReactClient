# FacetReactClient

2021-May-17   
CMSB

A React-based client for the [Virtuoso Faceted Browsing Service](http://vos.openlinksw.com/owiki/wiki/VOS/VirtuosoFacetsWebService).

FacetReactClient uses [FacetJsClient](https://github.com/OpenLinkSoftware/FacetJsClient) for communicating with the Faceted Browsing Service's /fct/service endpoint.

See also:

* branch [develop](https://github.com/OpenLinkSoftware/FacetReactClient/tree/develop)
* [FacetReactClientDeploy](https://github.com/OpenLinkSoftware/FacetReactClientDeploy)

## Current Status

FacetReactClient is a work in progress. It is incomplete and does not yet include all the features and filter options supported by the production version of [fct](https://github.com/OpenLinkSoftware/fct), like that deployed on [URIBurner](http://linkeddata.uriburner.com/fct/).

FacetReactClient as it stands is intended to serve as an example of a React client built on top of [FacetJsClient](https://github.com/OpenLinkSoftware/FacetReactClient) and utilising the [Faceted Browsing Service](http://vos.openlinksw.com/owiki/wiki/VOS/VirtuosoFacetsWebService) `/fct/service` endpoint. The hope is you might find it useful as the starting point for your own UI to Faceted Browsing Service. 

FacetReactClient includes a minimal UI alongside the React UI. It provides a basic framework for testing components with a minimum of decoration. This scaffolding is a stop gap feature en route to a production version and hasn't yet been removed.

## Deployment

Before building an app-bundle.js for use with FacetReactClientDeploy, edit `FctConfig.js` to set the Facet Service host to be used by the deployed FacetReactClient. In `FctConfig.js`, ensure `deploymentBasePath` is set to `'/facet'`.

## Current Test Server

<http://osdb.openlinksw.com:4433/facet/>

### A Quick Test Drive

* Try searching on text 'skiing'.
* Open and pin the 'Settings/Filters' sidebar.
* Select 'Type' from the available Entity Filters, then select 'Ski Resort' from the listed entity types.
* Select 'Attributes' from the Entity Filters list, then select 'altitude (m)'
* Note the filters being applied by Fct to successively narrow the search results in each step above.

## CORS 

If your browser console reveals errors due to CORS restrictions, the SQL script below can be applied to the Virtuoso instance hosting the target FCT service. It is intended for **development use only**.

```
DB.DBA.VHOST_REMOVE (
  lhost=>'*ini*',
  vhost=>'*ini*',
  lpath=>'/fct/service'
);

DB.DBA.VHOST_DEFINE (
  lhost=>'*ini*',
  vhost=>'*ini*',
  lpath=>'/fct/service',
  ppath=>'/SOAP/Http/fct_svc',
  is_dav=>0,
  is_brws=>0,
  soap_user=>'SPARQL',
  ses_vars=>0,
  opts=>vector ('cors', '*', 'cors_restricted', 0),
  is_default_host=>0
);

```
// Facet Configuration Settings

export const fctConfig = {
  deploymentBasePath: '/facet',
  getDeploymentBasePath: function () {
    return '' // Use with webpack-dev-server / webpack --mode development
    // return this.deploymentBasePath; // Use with webpack --mode production
  }
}
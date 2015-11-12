import Ember from 'ember';

/** recursive function to that build the Ember's router.
 *
 * There is a default configuration for the view "model" and "collection":
 *
 * - if the view name is "model", then the default url config is:
 *
 *    {root: '/:id'}
 *
 * - if the view name is "collection", then the default url config is:
 *
 *    {root: '/', prefix: '/i'}
 *
 */
var convertResourceViewToRoute = function(router, resourceViews, prefix) {
    var urlPrefix, urlRoot, viewConfig;

    Object.keys(resourceViews).forEach(function(viewName) {

        viewConfig = resourceViews[viewName];

        if (viewConfig.outlet) {
            urlRoot = Ember.get(viewConfig, 'outlet.url.root');
            urlPrefix = Ember.get(viewConfig, 'outlet.url.prefix');

            /** set default url config */
            if (viewName === 'model') {
                if (!urlRoot) {
                    urlRoot = '/:id';
                }
            } else if (viewName === 'collection') {
                if (!urlRoot) {
                    urlRoot = '/';
                }
                if (!urlPrefix) {
                    urlPrefix = '/i';
                }
            } else {
                if (!urlRoot) {
                    urlRoot = `/${viewName}`;
                }
                if (!urlPrefix) {
                    urlPrefix = '';
                }
            }

            /** build the router recursively */
            router.route(viewName, {path: urlRoot}, function() {
                convertResourceViewToRoute(this, viewConfig, urlPrefix);
            });
        } else {
            if (viewName !== 'outlet') {
                if (viewName === 'index') {
                    return;
                }
                prefix = prefix || '';
                router.route(viewName, {path: `${prefix}/${viewName}`});
            }
        }
    });
};


export default function(router, config) {
    var applicationViews = Ember.getWithDefault(config, 'APP.eureka.views', {});

    Object.keys(applicationViews).forEach(function(view) {
        router.route('eureka', {path: '/i'}, function() {
            router.route(view, {path: `/${view}`});
        });
    });

    var resources = Object.keys(config.APP.eureka.resources);

    var dasherizedResource, resourceViews;
    router.route('eureka', {path: '/'}, function() {
        var innerRouter = this;
        resources.forEach(function(resource) {
            resourceViews = config.APP.eureka.resources[resource].views;

            dasherizedResource = resource.dasherize();

            if (resourceViews) {
                innerRouter.route(dasherizedResource, {path: `/${dasherizedResource}`}, function() {
                    convertResourceViewToRoute(this, resourceViews);
                });
            }
        });

    });
}

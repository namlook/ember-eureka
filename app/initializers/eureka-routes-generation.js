
import Ember from 'ember';
import config from '../config/environment';

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

    Ember.keys(resourceViews).forEach(function(viewName) {

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
                    urlRoot = '/'+viewName;
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
                router.route(viewName, {path: prefix+'/'+viewName});
            }
        }
    });
};


/** collection recursively all the route infos from the resource's view structure */
var collectResourceViews = function(resource, resourceViews, collection, root) {
    root = root || resource.dasherize();

    collection = collection || [{resource: resource, inner: true, path: root}];

    /* load inner index route: ('blog.index' for the blog resource) */
    if (root) {
        collection.push({resource: resource, name: 'index', path: root+'.index'});
    }

    var item;
    Ember.keys(resourceViews).forEach(function(viewName) {
        item = {resource: resource, name: viewName};

        if (root) {
            item.path = root+'.'+viewName;
        } else {
            item.path = viewName;
        }


        if (resourceViews[viewName].outlet) {
            item.inner = true;
            collection.push(item);
            collectResourceViews(resource, resourceViews[viewName], collection, item.path);
            var innerIndexItem = {resource: resource, name: 'index', path: item.path+'.index'};
            collection.push(innerIndexItem);
        } else {
            if (viewName !== 'outlet') {
                collection.push(item);
            }
        }
    });
    return collection;
};


export function initialize(container, application) {

    var eurekaResourceRoutes = Ember.A();

    var applicationViews = Ember.getWithDefault(config, 'APP.eureka.views', {});
    eurekaResourceRoutes.pushObjects(collectResourceViews('', applicationViews));

    var resources = Ember.keys(config.APP.eureka.resources);

    var resourceViews, dasherizedResource;
    resources.forEach(function(resource) {
        resourceViews = config.APP.eureka.resources[resource].views;

        dasherizedResource = resource.dasherize();

        if (resourceViews) {
            eurekaResourceRoutes.pushObjects(collectResourceViews(resource, resourceViews));

            application.Router.map(function() {
                this.route('eureka', {path: '/'}, function() {
                    this.route(dasherizedResource, {path: '/'+dasherizedResource}, function() {
                        convertResourceViewToRoute(this, resourceViews);
                    });
                });
            });
        }


    });

    /**** inject the routes list into application ****/
    application.register('eurekaResourceRoutes:main', eurekaResourceRoutes, {instantiate: false, singleton: true});
}

export default {
  name: 'eureka-routes-generation',
  after: 'eureka-structure',
  initialize: initialize
};
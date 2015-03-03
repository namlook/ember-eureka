import Ember from 'ember';
import config from '../config/environment';

/** build the route's queryParams from structure's config
 */
var getRouteQueryParams = function(viewConfig) {
    if (viewConfig === undefined) {
        return null;
    }

    var queryParams = Ember.get(viewConfig, 'queryParams');

    var results = {};
    if (queryParams) {
        if (!Ember.isArray(queryParams)) {
            console.error("Eureka: structure's queryParams should be an array");
        }

        var paramName, config;
        queryParams.forEach(function(param) {

            if (typeof(param) !== 'string' && param) {
                paramName = Ember.keys(param)[0];
                results[paramName] = {};
                config = param[paramName];

                if (Ember.get(config, 'as')) {
                    paramName = Ember.get(config, 'as');
                }

                if (Ember.get(config, 'replace') === true) {
                    Ember.set(results, paramName+'.replace', true);
                } else {
                    Ember.set(results, paramName+'.replace', false);
                }

                if (Ember.get(config, 'refreshModel') === true) {
                    Ember.set(results, paramName+'.refreshModel', true);
                } else {
                    Ember.set(results, paramName+'.refreshModel', false);
                }
            }

        });
    }

    if (Ember.keys(results).length) {
        return results;
    }
    return null;
};

var applicationStructure = config.APP.structure.application;
var resourcesStructure = config.APP.structure.resources;

var getViewConfig = function(routeInfo) {

    var viewPath, fullViewPath;
    if (!routeInfo.resource) {
        viewPath = routeInfo.path;
        fullViewPath = 'views';
    } else {
        viewPath = routeInfo.path.split('.').slice(1).join('.');
        fullViewPath = routeInfo.resource+'.views';
    }

    if (viewPath) {
        fullViewPath = fullViewPath+'.'+viewPath;
    }


    var viewConfig;
    if (!routeInfo.resource) {
        viewConfig = Ember.getWithDefault(applicationStructure, fullViewPath, {});
    } else {
        viewConfig = Ember.getWithDefault(resourcesStructure, fullViewPath, {});
    }

    if (viewConfig.outlet) {
        if (typeof(viewConfig.outlet) === 'object') {
            viewConfig = viewConfig.outlet;
        } else {
            viewConfig = {};
        }
    }

    return viewConfig || {};
};

/** fill the generic controllers and routes with meta informations from structure
 */
export function initialize(container, application) {


    var eurekaResourceModelRoutes = {};
    var eurekaResourceNewRoutes = {};

    var controller, route, viewConfig;
    container.resolve('eurekaResourceRoutes:main').forEach(function(routeInfo) {

        viewConfig = getViewConfig(routeInfo);

        // add the widgets to viewConfig if is doesn't exists
        viewConfig.widgets = Ember.A(viewConfig.widgets);


        // if the view is an inner view and doesn't specify an outlet, we add it
        if (routeInfo.inner && !viewConfig.widgets.findBy('type', 'outlet')) {
            viewConfig.widgets.pushObject({type: 'outlet'});
        }

        var resolvePath = 'eureka';
        if (routeInfo.path) {
            resolvePath += '.'+routeInfo.path;
        }

        if (routeInfo.inner) {
            viewConfig.isOutlet = true;
        }

        if (routeInfo.path.split('.').slice(-1)[0] === 'model') {
            eurekaResourceModelRoutes[routeInfo.resource] = 'eureka.'+routeInfo.path;
        }
        if (routeInfo.path.split('.').slice(-1)[0] === 'new') {
            eurekaResourceNewRoutes[routeInfo.resource] = 'eureka.'+routeInfo.path;
        }


        // route
        route = container.resolve('route:'+resolvePath);
        route.reopen({
            modelType: routeInfo.resource,
            routeType: routeInfo.name,
            fqvn: routeInfo.path,
            meta: Ember.Object.create(viewConfig),
            queryParams: getRouteQueryParams(viewConfig)
        });

        // controller
        controller = container.resolve('controller:'+resolvePath);
        controller.reopen({
            modelType: routeInfo.resource,
            fqvn: routeInfo.path,
            meta: Ember.Object.create(viewConfig)
        });

    });

    /**** inject all the model routes into application ****/
    application.register('eurekaResourceRoutes:model', eurekaResourceModelRoutes, {instantiate: false, singleton: true});
    application.register('eurekaResourceRoutes:new', eurekaResourceNewRoutes, {instantiate: false, singleton: true});
}

export default {
  name: 'eureka-generic-routes-controllers',
  after: 'eureka-routes-generation',
  initialize: initialize
};

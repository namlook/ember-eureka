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


/** fill the generic controllers and routes with meta informations from structure
 */
export function initialize(container) {

    var structure = config.APP.structure;

    var viewPath, controller, route, viewConfig;
    var widgets;
    container.resolve('eurekaRoutes:main').forEach(function(routeInfo) {
        if (routeInfo.modelType) {
            if (routeInfo.inner) {
                viewConfig = Ember.get(structure.models, routeInfo.modelType+'.views.'+routeInfo.type+'.outlet');

                // the "outlet view" should at least has an outlet widget.
                if (!viewConfig) {
                    viewConfig = {};
                }
                if (!viewConfig.widgets) {
                    viewConfig.widgets = [];
                }
                widgets = Ember.A(viewConfig.widgets);

                // if there is no "outlet" widget, we add it at the end
                if (!widgets.findBy('type', 'outlet')) {
                    viewConfig.widgets.push({type: 'outlet'});
                }
            } else {
                viewPath = routeInfo.name.split('.').slice(2).join('.');
                viewConfig = Ember.get(structure.models, routeInfo.modelType+'.views.'+viewPath);
            }
        } else {
            viewConfig = Ember.get(structure, 'application.views.'+routeInfo.name.split('.').slice(1).join('.'));
        }

        // controller
        controller = container.resolve('controller:'+routeInfo.name);
        controller.reopen({
            modelType: routeInfo.modelType,
            fqvn: routeInfo.name,
            meta: Ember.Object.create(viewConfig)
        });

        // route
        route = container.resolve('route:'+routeInfo.name);
        route.reopen({
            modelType: routeInfo.modelType,
            routeType: routeInfo.type,
            fqvn: routeInfo.name,
            meta: Ember.Object.create(viewConfig),
            queryParams: getRouteQueryParams(viewConfig)
        });

    });
}

export default {
  name: 'eureka-generics',
  after: 'eureka-routes-generation',
  initialize: initialize
};

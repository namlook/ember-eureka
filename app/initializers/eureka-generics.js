import Ember from 'ember';
import config from '../config/environment';


/** fill the generic controllers and routes with meta informations from structure
 */
export function initialize(container) {

    var structure = config.APP.structure;

    var viewPath, controller, route, viewConfig;
    container.resolve('eurekaRoutes:main').forEach(function(routeInfo) {
        if (routeInfo.modelType) {
            if (routeInfo.inner) {
                viewConfig = Ember.get(structure.models, routeInfo.modelType+'.views.'+routeInfo.type+'.outlet');
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
            meta: Ember.Object.create(viewConfig)
        });

    });
}

export default {
  name: 'eureka-generics',
  after: 'eureka-routes-generation',
  initialize: initialize
};

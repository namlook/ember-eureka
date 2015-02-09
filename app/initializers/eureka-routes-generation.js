
import Ember from 'ember';
import config from '../config/environment';


/** returns the route from the structure's views.
 * `routeType` should be `model` or `collection`
 * if `modelType` is null, then this function returns
 * the application routes (if any)
 */
var getRoutes = function(routeType, modelType) { // model or collection
    var routes = [];
    var views = {};
    if (modelType) {
        views = config.APP.structure.models[modelType].views;
        if (views) {
            var routeTypeView = Ember.get(views, routeType);
            if (routeTypeView) {
                routes = Ember.keys(routeTypeView);
            }
        }
    } else {
        views = config.APP.structure.application.views;
        if (views) {
            routes = Ember.keys(views);
        }
    }
    return routes;
};


export function initialize(container, application) {

    Ember.keys(config.APP.structure.models).forEach(function(modelType) {

        var underscoredType = modelType.underscore();

        var applicationRoutes = getRoutes();
        var modelRoutes = getRoutes('model', modelType);
        var collectionRoutes = getRoutes('collection', modelType);

        application.Router.map(function() {
            // general application routes
            var that = this;
            applicationRoutes.forEach(function(route) {
                that.route(route, {path: '/'+route});
            });

            // typed routes
            this.route(underscoredType, function(){
                this.route('collection', {path: '/'}, function() {
                    this.route('index', {path: '/'});

                    // generate the routes from `views.collection`
                    var that = this;
                    collectionRoutes.forEach(function(route) {
                        that.route(route, {path: '/i/'+route});
                    });
                });

                this.route('model.new', {path: '/new'});
                this.route('model', {path: '/:id'}, function() {
                    this.route('index', {path: '/'});

                    // generate the routes from `views.model`
                    var that = this;
                    modelRoutes.forEach(function(route) {
                        that.route(route, {path: '/'+route});
                    });
                    this.route('edit', {path: '/edit'});
                    // this.route('related', {path: '/:related'});
                });
            });
        });
    });
}

export default {
  name: 'eureka-routes-generation',
  after: 'eureka-structure',
  initialize: initialize
};


import Ember from 'ember';
import config from '../config/environment';

/** returns the route from the structure's views.
 * `routeType` should be `model` or `collection`
 * if `modelType` is null, then this function returns
 * the application routes (if any)
 */
var getRouteNames = function(routeType, modelType) { // model or collection
    var routes = [];
    var views = {};

    // if it's a model view
    if (modelType) {
        views = config.APP.structure.models[modelType].views;
        if (views) {
            var routeTypeView = Ember.get(views, routeType);
            if (routeTypeView) {
                routes = Ember.keys(routeTypeView);
            }
        }

    // otherwise, it's an application view
    } else {
        views = config.APP.structure.application.views;
        if (views) {
            routes = Ember.keys(views);
        }
    }

    routes.removeObjects(['default', 'basic', 'application', 'widgets', 'object', 'collection', 'model', 'outlet']);
    return routes;
};


export function initialize(container, application) {


    /*** generate application routes ***/
    var applicationRouteNames = getRouteNames('application');

    // general application routes
    applicationRouteNames.forEach(function(route) {
        application.Router.map(function() {
            this.route('eureka', {path: '/'}, function() {
                this.route(route, {path: '/'+route});
            });
        });
    });


    var eurekaRoutes = Ember.A();
    eurekaRoutes.pushObjects(applicationRouteNames.map(function(route) {
        return {
            name: 'eureka.'+route
        };
    }));

    /*** generate route for each model ***/
    Ember.keys(config.APP.structure.models).forEach(function(modelType) {

        var underscoredType = modelType.underscore();

        var emptyRouteNames = getRouteNames('empty', modelType);
        var modelRouteNames = getRouteNames('model', modelType);
        var collectionRouteNames = getRouteNames('collection', modelType);


        /**** collect model and collection route full name ***/
        if (modelRouteNames.length && collectionRouteNames.length && emptyRouteNames.length) {
            eurekaRoutes.pushObject({
                modelType: modelType,
                name: 'eureka.'+underscoredType,
                inner: true
            });
        }

        /*** empty routes ***/
        if (emptyRouteNames.length) {
            eurekaRoutes.pushObject({
                type: 'empty',
                modelType: modelType,
                name: 'eureka.'+underscoredType+'.empty',
                inner: true
            });
        }

        eurekaRoutes.pushObjects(emptyRouteNames.map(function(route) {
            return {
                type: 'empty',
                modelType: modelType,
                name: 'eureka.'+underscoredType+'.empty.'+route
            };
        }));

        /*** model routes ***/
        if (modelRouteNames.length) {
            eurekaRoutes.pushObject({
                type: 'model',
                modelType: modelType,
                name: 'eureka.'+underscoredType+'.model',
                inner: true
            });
        }

        eurekaRoutes.pushObjects(modelRouteNames.map(function(route) {
            return {
                type: 'model',
                modelType: modelType,
                name: 'eureka.'+underscoredType+'.model.'+route
            };
        }));


        /*** collection routes ***/
        if (collectionRouteNames.length) {
            eurekaRoutes.pushObject({
                type: 'collection',
                modelType: modelType,
                name: 'eureka.'+underscoredType+'.collection',
                inner: true
            });
        }

        eurekaRoutes.pushObjects(collectionRouteNames.map(function(route) {
            return {
                type: 'collection',
                modelType: modelType,
                name: 'eureka.'+underscoredType+'.collection.'+route
            };
        }));

        /**** router update ****/
        application.Router.map(function() {
            // typed routes
            this.route('eureka', {path: '/'}, function() {
                this.route(underscoredType, function(){

                    // collection
                    this.route('collection', {path: '/'}, function() {
                        this.route('index', {path: '/'});

                        // generate the routes from `views.collection`
                        var that = this;
                        collectionRouteNames.forEach(function(route) {
                            if (route === 'index') {
                                return;
                            }
                            that.route(route, {path: '/i/'+route});
                        });
                    });

                    // empty
                    this.route('empty', {path: '/_'}, function() {
                        // generate the routes from `views.empty`
                        var that = this;
                        emptyRouteNames.forEach(function(route) {
                            that.route(route, {path: '/'+route});
                        });
                    });

                    // model
                    this.route('model', {path: '/:id'}, function() {
                        this.route('index', {path: '/'});

                        // generate the routes from `views.model`
                        var that = this;
                        modelRouteNames.forEach(function(route) {
                            if (route === 'index' || route === 'new') {
                                return;
                            }
                            that.route(route, {path: '/'+route});
                        });
                    });
                });
            });
        });
    });

    /**** inject the routes list into application ****/
    application.register('eurekaRoutes:main', eurekaRoutes, {instantiate: false, singleton: true});
}

export default {
  name: 'eureka-routes-generation',
  after: 'eureka-structure',
  initialize: initialize
};

import Resolver from 'ember/resolver';

var ENABLE_LOG = false;


// /** build the route's queryParams from structure's config
//  */
// var getRouteQueryParams = function(viewConfig) {
//     if (viewConfig === undefined) {
//         return null;
//     }

//     var queryParams = Ember.get(viewConfig, 'queryParams');

//     var results = {};
//     if (queryParams) {
//         if (!Ember.isArray(queryParams)) {
//             console.error("Eureka: structure's queryParams should be an array");
//         }

//         var paramName, config;
//         queryParams.forEach(function(param) {

//             if (typeof(param) !== 'string' && param) {
//                 paramName = Object.keys(param)[0];
//                 results[paramName] = {};
//                 config = param[paramName];

//                 if (Ember.get(config, 'as')) {
//                     paramName = Ember.get(config, 'as');
//                 }

//                 if (Ember.get(config, 'replace') === true) {
//                     Ember.set(results, paramName+'.replace', true);
//                 } else {
//                     Ember.set(results, paramName+'.replace', false);
//                 }

//                 if (Ember.get(config, 'refreshModel') === true) {
//                     Ember.set(results, paramName+'.refreshModel', true);
//                 } else {
//                     Ember.set(results, paramName+'.refreshModel', false);
//                 }
//             }

//         });
//     }

//     if (Object.keys(results).length) {
//         return results;
//     }
//     return null;
// };



/** if the route/controller/template doesn't exists,
 * resolve to the generic one. Example:
 *
 *   if 'user/collection/index' is not defined,
 *   then resolve to 'generic/collection/index'
 *
 * If the generic's one doesn't exists (like a new route),
 * then resolve to the generic default one. Example:
 *
 *   if 'generic/model/stuff' is not defined,
 *   then resolve to 'generic/model/default'
 */
export default Resolver.extend({

    resolveTemplate: function(parsedName) {
        var template = this._super(parsedName);

        if (parsedName.fullNameWithoutType.split('/')[0] !== 'eureka') {
            return template;
        }

        /** resolve to a regular template for "eureka" **/
        if (parsedName.fullNameWithoutType === 'eureka') {
            return template;
        }

        var initialFullName = parsedName.fullNameWithoutType;

        // fetch generic template
        if (!template) {
            var path = parsedName.fullNameWithoutType.split('/').slice(2).join('/');
            var fullName = ['template:eureka/generic', path].join('/');
            parsedName = this.parseName(fullName);

            template = this._super(parsedName);

            // fetch generic default template
            if (!template) {
                // fullName = ['template:eureka/generic'];
                // var routeType = parsedName.fullNameWithoutType.split('/')[2];
                // if (routeType) {
                //     fullName.push(routeType);
                // }
                // fullName.push('default');
                // fullName = fullName.join('/');
                path = parsedName.fullNameWithoutType.split('/').slice(2).join('/');
                fullName = ['route:eureka/generic', path].join('/');
                parsedName = this.parseName(fullName);

                template = this._super(parsedName);


                // fetch the generic default one: eureka.generic.{collection, model}
                if (!template) {
                    if (initialFullName.match(/\/model$/)) {
                        fullName = 'template:eureka/generic/model';
                    } else if (initialFullName.match(/\/model\//)) {
                        fullName = 'template:eureka/generic/model/default';
                    } else if (initialFullName.match(/\/new$/)) {
                        fullName = 'template:eureka/generic/new';
                    } else if (initialFullName.match(/\/new\//)) {
                        fullName = 'template:eureka/generic/new/default';
                    } else if (initialFullName.split('/').length === 2) { // eureka.<resource>
                        fullName = 'template:eureka/generic/collection';
                    } else {
                        fullName = 'template:eureka/generic/collection/default';
                    }
                    parsedName = this.parseName(fullName);

                    template = this._super(parsedName);
                }
            }
        }

        if (ENABLE_LOG) {
            if (parsedName.fullNameWithoutType === initialFullName) {
                console.log('resolved template:', initialFullName, 'found.');
            } else {
                console.log('resolved template:', initialFullName, 'falling back to', parsedName.fullNameWithoutType);
            }
        }

        return template;
    },

    resolveRoute: function(parsedName) {
        var route = this._super(parsedName);

        /** if the route is not an eureka's route */
        if (parsedName.fullNameWithoutType.split('/')[0] !== 'eureka') {
            return route;
        }

        /** resolve to a regular route for "eureka" **/
        if (parsedName.fullNameWithoutType === 'eureka') {
            return route.extend({
                eurekaViewPath: 'eureka'
            });
        }

        var initialFullName = parsedName.fullNameWithoutType;

        // fetch generic route :eureka.generic.*/*
        if (!route) {
            var path = parsedName.fullNameWithoutType.split('/').slice(2).join('/');
            var fullName = ['route:eureka/generic', path].join('/');
            // console.log('fullName 1)', fullName);
            parsedName = this.parseName(fullName);
            route = this._super(parsedName);

            // fetch the generic default one: eureka.generic.{collection, model}
            if (!route) {
                if (initialFullName.match(/\/loading$/)) {
                    fullName = 'route:eureka/generic/_loading';
                } else if (initialFullName.match(/\/error$/)) {
                    fullName = 'route:eureka/generic/_error';
                } else if (initialFullName.match(/\/model$/)) {
                    fullName = 'route:eureka/generic/_model';
                } else if (initialFullName.match(/\/model\//)) {
                    fullName = 'route:eureka/generic/model/default';
                } else if (initialFullName.match(/\/new$/)) {
                    fullName = 'route:eureka/generic/_new';
                } else if (initialFullName.match(/\/new\//)) {
                    fullName = 'route:eureka/generic/new/default';
                } else if (initialFullName.split('/').length === 2) { // eureka.<resource>
                    fullName = 'route:eureka/generic/_collection';
                } else {
                    fullName = 'route:eureka/generic/collection/default';
                }
                parsedName = this.parseName(fullName);

                route = this._super(parsedName);
            }
        }

        if (ENABLE_LOG) {
            if (parsedName.fullNameWithoutType === initialFullName) {
                console.log('resolved route:', initialFullName, 'found.');
            } else {
                console.log('resolved route:', initialFullName, 'falling back to', parsedName.fullNameWithoutType);
            }
        }

        return route.extend({
            eurekaViewPath: initialFullName
            // queryParams: getRouteQueryParams(viewConfig) XXX TODO, find the viewConfig (currently in init)
        });
    },

    resolveController: function(parsedName) {
        var controller = this._super(parsedName);

        // console.log('1) controller-', parsedName);
        if (parsedName.fullNameWithoutType.split('/')[0] !== 'eureka') {
            return controller;
        }

        /** resolve to a regular controller for "eureka" **/
        if (parsedName.fullNameWithoutType === 'eureka') {
            return controller.extend({
                eurekaViewPath: 'eureka'
            });
        }

        var initialFullName = parsedName.fullNameWithoutType;

        // fetch generic eureka.generic.{model, collection}.{index, edit, new}
        if (!controller) {
            var path = parsedName.fullNameWithoutType.split('/').slice(2).join('/');
            var fullName = ['controller:eureka/generic', path].join('/');
            parsedName = this.parseName(fullName);
            controller = this._super(parsedName);

            // fetch the generic default one: eureka.generic.default
            if (!controller) {
                if (initialFullName.match(/\/loading$/)) {
                    fullName = 'controller:eureka/generic/_loading';
                } else if (initialFullName.match(/\/error$/)) {
                    fullName = 'controller:eureka/generic/_error';
                } else if (initialFullName.match(/\/model$/)) {
                    fullName = 'controller:eureka/generic/_model';
                } else if (initialFullName.match(/\/model\//)) {
                    fullName = 'controller:eureka/generic/model/default';
                } else if (initialFullName.match(/\/new$/)) {
                    fullName = 'controller:eureka/generic/_new';
                } else if (initialFullName.match(/\/new\//)) {
                    fullName = 'controller:eureka/generic/new/default';
                } else if (initialFullName.split('/').length === 2) { // eureka.<resource>
                    fullName = 'controller:eureka/generic/_collection';
                } else {
                    fullName = 'controller:eureka/generic/collection/default';
                }
                parsedName = this.parseName(fullName);
                controller = this._super(parsedName);
            }
        }

        if (ENABLE_LOG) {
            if (parsedName.fullNameWithoutType === initialFullName) {
                console.log('resolved controller:', initialFullName, 'found.');
            } else {
                console.log('resolved controller:', initialFullName, 'falling back to', parsedName.fullNameWithoutType);
            }
        }

        return controller.extend({
            eurekaViewPath: initialFullName
        });
    }


});
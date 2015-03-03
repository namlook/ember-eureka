
import Resolver from 'ember/resolver';

var ENABLE_LOG = false;

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
            var fullName = ["template:eureka/generic", path].join('/');
            parsedName = this.parseName(fullName);

            template = this._super(parsedName);

            // fetch generic default template
            if (!template) {
                fullName = ['template:eureka/generic'];
                var routeType = parsedName.fullNameWithoutType.split('/')[2];
                if (routeType) {
                    fullName.push(routeType);
                }
                fullName.push('default');
                fullName = fullName.join('/');
                parsedName = this.parseName(fullName);

                template = this._super(parsedName);


                // fetch the generic default one: eureka.generic.default
                if (!template) {
                    fullName = 'template:eureka/generic/default';
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
            return route;
        }

        var initialFullName = parsedName.fullNameWithoutType;

        // fetch generic route :eureka.generic.*/*
        if (!route) {
            var path = parsedName.fullNameWithoutType.split('/').slice(2).join('/');
            var fullName = ["route:eureka/generic", path].join('/');
            // console.log('fullName 1)', fullName);
            parsedName = this.parseName(fullName);
            route = this._super(parsedName);

            // fetch the generic default one: eureka.generic.{collection, model}
            if (!route) {
                if (initialFullName.match(/\/model$/)) {
                    fullName = 'route:eureka/generic/model';
                } else if (initialFullName.match(/\/model\//)) {
                    fullName = 'route:eureka/generic/model/default';
                } else if (initialFullName.match(/\/new$/)) {
                    fullName = 'route:eureka/generic/new';
                } else if (initialFullName.match(/\/new\//)) {
                    fullName = 'route:eureka/generic/new/default';
                } else if (initialFullName.split('/').length === 2) { // eureka.<resource>
                    fullName = 'route:eureka/generic/collection';
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

        return route.extend();
    },

    resolveController: function(parsedName) {
        var controller = this._super(parsedName);

        // console.log('1) controller-', parsedName);
        if (parsedName.fullNameWithoutType.split('/')[0] !== 'eureka') {
            return controller;
        }

        /** resolve to a regular controller for "eureka" **/
        if (parsedName.fullNameWithoutType === 'eureka') {
            return controller;
        }

        var initialFullName = parsedName.fullNameWithoutType;

        // fetch generic eureka.generic.{model, collection}.{index, edit, new}
        if (!controller) {
            var path = parsedName.fullNameWithoutType.split('/').slice(2).join('/');
            var fullName = ["controller:eureka/generic", path].join('/');
            parsedName = this.parseName(fullName);
            controller = this._super(parsedName);

            // fetch the generic default one: eureka.generic.default
            if (!controller) {
                if (initialFullName.match(/\/model$/)) {
                    fullName = 'controller:eureka/generic/model';
                } else if (initialFullName.match(/\/model\//)) {
                    fullName = 'controller:eureka/generic/model/default';
                } else if (initialFullName.match(/\/new$/)) {
                    fullName = 'controller:eureka/generic/new';
                } else if (initialFullName.match(/\/new\//)) {
                    fullName = 'controller:eureka/generic/new/default';
                } else if (initialFullName.split('/').length === 2) { // eureka.<resource>
                    fullName = 'controller:eureka/generic/collection';
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

        return controller.extend();
    }


});
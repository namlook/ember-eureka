import Ember from 'ember';

export default Ember.Controller.extend({

    applicationController: Ember.inject.controller('application'),

    currentRouteName: Ember.computed.alias('applicationController.currentRouteName'),


    init: function() {
        this._super.apply(this, arguments);
        var eurekaViewPath = this.get('eurekaViewPath');
        var eurekaViewConfig = this.EUREKA_VIEWS_CONFIG.get(eurekaViewPath);
        if (eurekaViewConfig) {
            this.set('fqvn', eurekaViewConfig.get('info.path'));
            this.set('resource', eurekaViewConfig.get('info.resource'));
            this.set('routeType', eurekaViewConfig.get('info.name'));
            this.set('meta', eurekaViewConfig.get('config'));
        } else {
            console.log('no config for', eurekaViewPath);
        }
    },


    queryParams: Ember.computed('eurekaViewPath', function() {
        if (this.get('_queryParams')) {
            return this.get('_queryParams');
        }

        /** fetch the query params from the config **/
        var eurekaViewPath = this.get('eurekaViewPath');
        var eurekaViewConfig = this.EUREKA_VIEWS_CONFIG.getWithDefault(eurekaViewPath, {});
        var queryParams = Ember.getWithDefault(eurekaViewConfig, 'config.queryParams', []);

        /** set the default values of the query params **/
        var defaultValue;
        var that = this;
        queryParams.forEach(function(param) {
            defaultValue = Ember.getWithDefault(queryParams, param+'.defaultValue', null);
            that.set(param, defaultValue);
        });

        this.set('_queryParams', queryParams);
        return queryParams;
    }),


    // queryParams: function() {
    //     var queryParams = this.get('meta.queryParams');
    //     var that = this;
    //     if (queryParams) {
    //         if (!Ember.isArray(queryParams)) {
    //             console.error("Eureka: structure's queryParams should be an array");
    //         }

    //         // set the params on the controller
    //         var paramName, config, defaultValue;
    //         queryParams.forEach(function(param) {

    //             if (typeof(param) === 'string') {
    //                 paramName = param;
    //                 defaultValue = null;
    //             } else {
    //                 paramName = Object.keys(param)[0];
    //                 config = param[paramName];
    //                 defaultValue = Ember.getWithDefault(config, 'defaultValue', null);
    //             }

    //             that.set(paramName, defaultValue);
    //         });

    //         return queryParams;
    //     }
    //     return Ember.A();
    // }.property('meta.queryParams'),


    actions: {
        /** In order to pass action to the controller, wigdets and compontents
         * has to send their actions with `this.sendAction('toControllerAction', actionName)`
         * A payload can be passed to the controller like this:
         *
         *   this.sendAction('toControllerAction', {name: 'save', payload: model});
         */
        toControllerAction: function(action) {
            console.log('received action', action);
            if (action.name) {
                this.send(action.name, action.payload);
            } else {
                this.send(action);
            }
        },

        /** allow to make a route transition from a widget */
        transitionTo: function(payload) {
            if (payload.model) {
                var modelId = payload.model.get('_id');
                if (modelId) {
                    this.transitionToRoute(payload.routePath, modelId);
                    return;
                }
            }
            this.transitionToRoute(payload.routePath);
        }
    },

});

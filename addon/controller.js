import Ember from 'ember';

export default Ember.Controller.extend({
    needs: ['application'],

    applicationController: Ember.computed.alias('controllers.application'),
    currentRouteName: Ember.computed.alias('applicationController.currentRouteName'),


    queryParams: function() {
        var queryParams = this.get('meta.queryParams');
        var that = this;
        if (queryParams) {
            if (!Ember.isArray(queryParams)) {
                console.error("Eureka: structure's queryParams should be an array");
            }

            // set the params on the controller
            var paramName, config, defaultValue;
            queryParams.forEach(function(param) {

                if (typeof(param) === 'string') {
                    paramName = param;
                    defaultValue = null;
                } else {
                    paramName = Ember.keys(param)[0];
                    config = param[paramName];
                    defaultValue = Ember.getWithDefault(config, 'defaultValue', null);
                }

                that.set(paramName, defaultValue);
            });

            return queryParams;
        }
        return Ember.A();
    }.property('meta.queryParams'),


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

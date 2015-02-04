import Ember from 'ember';

export default Ember.Controller.extend({
    needs: ['application'],

    currentRouteName: Ember.computed.alias('controllers.application.currentRouteName'),

    meta: function() {
        return this.get('model.meta');
    }.property('model.meta'),

    modelType: function() {
        return this.get('meta.modelType');
    }.property('meta.modelType'),

    store: function() {
        var modelType = this.get('modelType');
        return this.db[modelType];
    }.property('modelType'),

    actions: {
        /** In order to pass action to the controller, wigdets and compontents
         * has to send their actions with `this.sendAction('toControllerAction', actionName)`
         * A payload can be passed to the controller like this:
         *
         *   this.sendAction('toControllerAction', {name: 'save', payload: model});
         */
        toControllerAction: function(action) {
            if (action.name) {
                this.send(action.name, action.payload);
            } else {
                this.send(action);
            }
        }
    }

});

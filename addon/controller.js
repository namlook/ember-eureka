import Ember from 'ember';

export default Ember.Controller.extend({
    needs: ['application'],

    application: Ember.computed.alias('controllers.application'),
    currentRouteName: Ember.computed.alias('application.currentRouteName'),

    /** returns the parent of the route :
     * if the currentRouteName is `user.model.edit`,
     * the currentRouteParentName is `user.model`
     *
     * This is used to load the correct widgets:
     *  `user.model.widgets` or user.mode.edit.widgets`
     */
    currentRouteParentName: function() {
        return this.get('currentRouteName').split('.').slice(0, -1).join('.');
    }.property('currentRouteName'),


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
        }
    }

});

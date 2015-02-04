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
    }.property('modelType')

});

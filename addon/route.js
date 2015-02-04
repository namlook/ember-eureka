import Ember from 'ember';

export default Ember.Route.extend({

    modelType: function() {
        return this.get('routeName').split('.')[0].camelize().capitalize();
    }.property('routeName'),

    store: function() {
        var modelType = this.get('modelType');
        return this.db[modelType];
    }.property('modelType')
});
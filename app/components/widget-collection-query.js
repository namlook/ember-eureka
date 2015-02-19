import Ember from 'ember';
import WidgetCollection from 'ember-eureka/widget-collection';

export default WidgetCollection.extend({


    // query: Ember.computed.alias('routeModel.query'),
    // queryText: function() {
    //     var query = this.get('routeModel.query');
    //     return JSON.stringify(query);
    // }.property('routeModel.query'),

    // _queryTextObserver: function() {
    //     var queryText = this.get('queryText');
    //     var query = null;
    //     try {
    //         query = JSON.parse(queryText);
    //     } catch (e) {
    //         console.log('bad query');
    //     }
    //     if (query) {
    //         this.set('routeModel.query', query);
    //     }
    // }.observes('queryText')

});

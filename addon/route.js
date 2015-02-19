import Ember from 'ember';

/** An Eureka route takes the form of :
 *
 *   eureka.<modelType>.*
 *   eureka.<modelType>.<routeType>.*
 *
 * where `routeType` is ether `model` or `collection`
 */
export default Ember.Route.extend({

    store: function() {
        var modelType = this.get('modelType');
        return this.db[modelType];
    }.property('modelType')
});
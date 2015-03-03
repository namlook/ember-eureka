import Ember from 'ember';

/** An Eureka route takes the form of :
 *
 *   eureka.<modelType>.*
 *   eureka.<modelType>.<routeType>.*
 *
 * where `routeType` is ether `model` or `collection`
 */
export default Ember.Route.extend({

    /** if `redirect` is present in meta, then redirect to the
     * specified route in the `redirect` value.
     */
    redirect: function() {
        var redirection = this.get('meta.redirect');
        if (redirection) {
            this.transitionTo(redirection);
        }
    },

    store: function() {
        var modelType = this.get('modelType');
        return this.db[modelType];
    }.property('modelType')

});
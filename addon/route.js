import Ember from 'ember';

/** An Eureka route takes the form of :
 *
 *   eureka.<modelType>.*
 *   eureka.<modelType>.<routeType>.*
 *
 * where `routeType` is ether `model` or `collection`
 */
export default Ember.Route.extend({

    /** if in `structure` `application.views.index` is an Ember route,
     * then make a redirection to the route
     */
    redirect: function() {
        // var redirection = Ember.get(this.appConfig, 'structure.application.views.index.redirect');
        console.log(this.get('modelType'), this.get('meta'));
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
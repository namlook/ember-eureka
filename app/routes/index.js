import Ember from 'ember';
import Route from 'ember-eureka/route';

export default Route.extend({

    /** if in `structure` `application.views.index` is an Ember route,
     * then make a redirection to the route
     */
    redirect: function() {
        var redirection = Ember.get(this.appConfig, 'structure.application.views.index');
        if (typeof(redirection) === 'string') {
            this.transitionTo(redirection);
        }
    },

    model: function() {
        return this.modelFor('application');
    }

});

import Ember from 'ember';

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
        var resource = this.get('resource');
        return this.db[resource];
    }.property('resource')

});
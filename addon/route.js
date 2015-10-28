import Ember from 'ember';

export default Ember.Route.extend({

    init: function() {
        this._super.apply(this, arguments);
        var eurekaViewPath = this.get('eurekaViewPath');
        var eurekaViewConfig = this.EUREKA_VIEWS_CONFIG.get(eurekaViewPath);
        if (eurekaViewConfig) {
            this.set('fqvn', eurekaViewConfig.get('info.path'));
            this.set('resource', eurekaViewConfig.get('info.resource'));
            this.set('routeType', eurekaViewConfig.get('info.name'));
            this.set('meta', eurekaViewConfig.get('config'));
        } else {
            console.log('no config for', eurekaViewPath);
        }
    },

    /** if `redirect` is present in meta, then redirect to the
     * specified route in the `redirect` value.
     */
    redirect: function() {
        var redirection = this.get('meta.redirect');
        if (redirection) {
            this.transitionTo(redirection);
        }
    },

    store: Ember.computed('resource', function() {
        var resource = this.get('resource');
        /** TODO REMOVE **/
        resource = Ember.String.classify(resource);
        /***/
        return this.db[resource];
    })

});
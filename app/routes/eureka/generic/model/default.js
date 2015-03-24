import Route from 'ember-eureka/route';

export default Route.extend({

    model: function() {
        var resource = this.get('resource');
        var modelRoute = this.container.resolve('eurekaResourceRoutes:model')[resource];
        return this.modelFor(modelRoute);
    },

    actions: {
        refreshModel: function() {
            this.refresh();
            return true; // bubble up to the model route
        }
    }

});

import Route from 'ember-eureka/route';

export default Route.extend({

    model: function() {
        var resourceRoute = this.get('fqvn').split('.model.')[0]+'.model';
        return this.modelFor(resourceRoute);
    },

    actions: {
        refreshModel: function() {
            this.refresh();
            return true; // bubble up to the model route
        }
    }

});

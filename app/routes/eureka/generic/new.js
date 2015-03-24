import Route from 'ember-eureka/route';

export default Route.extend({

    model: function() {
        return this.get('store').createRecord();
    },

    actions: {
        refreshModel: function() { // XXX only used by model-form
            // this.refresh();
            // return true; // bubble up to the model route
        }
    }

});
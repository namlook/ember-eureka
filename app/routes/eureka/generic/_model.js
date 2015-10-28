import Route from 'ember-eureka/route';

export default Route.extend({

    model: function(params) {
        var modelId = params.id;
        // var populate = App.getModelMeta(_type).get('editViewPopulate');
        if (!modelId) {
            console.log('XXX no id');
            // return this.get('store').createRecord();
        }
        return this.get('store').fetch(modelId);
    },

    actions: {
        refreshModel: function() {
            this.refresh();
        }
    }

});

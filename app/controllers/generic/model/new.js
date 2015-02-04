import Controller from 'ember-eureka/controller';

export default Controller.extend({
    actions: {
        save: function(model) {
            var modelType = model.get('meta.modelType').dasherize();
            this.transitionToRoute(modelType+'.model.index', model.get('_id'));
        },
        cancel: function(model) {
            var modelType = model.get('meta.modelType').dasherize();
            var modelId = model.get('_id');
            if (modelId) {
                this.transitionToRoute(modelType+'.model.index', modelId);
            } else {
                this.transitionToRoute(modelType+'.collection.index');
            }
        }
    }
});

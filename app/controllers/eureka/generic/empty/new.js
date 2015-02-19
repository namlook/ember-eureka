import Controller from 'ember-eureka/controller';

export default Controller.extend({
    actions: {
        save: function(model) {
            var dasherizedModelType = model.get('meta.modelType').dasherize();
            this.transitionToRoute('eureka.'+dasherizedModelType+'.model.index', model.get('_id'));
        },
        cancel: function(model) {
            var dasherizedModelType = model.get('meta.modelType').dasherize();
            var modelId = model.get('_id');
            if (modelId) {
                this.transitionToRoute('eureka.'+dasherizedModelType+'.model.index', modelId);
            } else {
                this.transitionToRoute('eureka.'+dasherizedModelType+'.collection.index');
            }
        }
    }
});
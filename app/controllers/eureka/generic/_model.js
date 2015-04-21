import Controller from 'ember-eureka/controller';

export default Controller.extend({

    actions: {
        delete: function(model) {
            var that = this;
            model.delete().then(function() {
                that.send('toControllerAction', {
                    name: 'transitionTo',
                    payload: {routePath: model.get('meta.collectionIndexViewPath')}
                });
            });
        }
    }
});
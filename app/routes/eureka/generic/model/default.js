import Route from 'ember-eureka/route';

export default Route.extend({

    model: function() {
        var modelType = this.get('modelType');
        var modelRoute = this.container.resolve('eurekaResourceRoutes:model')[modelType];
        return this.modelFor(modelRoute);
    }

});

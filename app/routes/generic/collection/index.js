
import Route from 'ember-eureka/route';

export default Route.extend({

    model: function() {
        var dasherizedModelType = this.get('modelType').dasherize();
        return this.modelFor(dasherizedModelType+'.collection');
    }
});

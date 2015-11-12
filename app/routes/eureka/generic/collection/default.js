import Route from 'ember-eureka/route';

export default Route.extend({

    model: function() {
        var dasherizedResource = this.get('resource').dasherize();
        var resourceRoute = this.get('fqvn').split(`.${dasherizedResource}.`)[0] + '.' + dasherizedResource;
        return this.modelFor(resourceRoute);
    }
});
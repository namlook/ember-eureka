import Route from 'ember-eureka/route';

export default Route.extend({

    model: function() {
        return this.modelFor('application');
    }

});

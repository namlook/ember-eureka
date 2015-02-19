
import Ember from 'ember';
import Route from 'ember-eureka/route';

export default Route.extend({

    model: function(params, transition) {
        var meta = this.get('store.modelMeta');
        return Ember.Object.create({
            params: transition.queryParams,
            meta: meta
        });
    }

});

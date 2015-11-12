import Ember from 'ember';
import Route from 'ember-eureka/route';
import Query from 'ember-eureka/collection-query';

export default Route.extend({

    model: function(params, transition) {
        var meta = this.get('store.modelMeta');
        var query = Query.create();
        if (transition.queryParams.query) {
            query.set('raw', JSON.parse(transition.queryParams.query));
        }
        return Ember.Object.create({
            params: transition.queryParams, // it should be transition.queryParams not params
            meta: meta,
            query: query
        });
    }
});

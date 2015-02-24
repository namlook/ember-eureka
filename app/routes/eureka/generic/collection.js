import Ember from 'ember';
import Query from 'ember-eureka/query';
import Route from 'ember-eureka/route';

export default Route.extend({

    queryParams: {
        query: {
            refreshModel: true
        }
    },

    model: function(params, transition) {
        var meta = this.get('store.modelMeta');
        var query = Query.create();
        if (transition.queryParams.query) {
            query.set('raw', JSON.parse(transition.queryParams.query));
        }
        return Ember.Object.create({
            params: transition.queryParams,
            meta: meta,
            query: query
        });
    }

});

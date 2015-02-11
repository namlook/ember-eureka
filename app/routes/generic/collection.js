
import Ember from 'ember';
import Route from 'ember-eureka/route';
import isEmpty from 'ember-eureka/utils/is-empty';

export default Route.extend({

    model: function(params, transition) {
        var query = {};
        if (!isEmpty(transition.queryParams)) {
            query = JSON.parse(transition.queryParams.query);
        }
        if (isEmpty(query)) {
            query = null;
        }
        var meta = this.get('store.modelMeta');
        return Ember.Object.create({
            query: query,
            meta: meta
        });
    }

});

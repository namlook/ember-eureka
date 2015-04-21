import isEmpty from 'ember-eureka/utils/is-empty';
import Controller from 'ember-eureka/controller';

export default Controller.extend({

    /** update the query param: `query` each time
     * the model.query is updated
     */
    queryModelObserver: function() {
        var query = this.get('model.query');
        var queryQP;
        if (query && !isEmpty(query)) {
            queryQP = this.get('model.query.json');
        } else {
            queryQP = null;
        }
        this.set('query', queryQP);
    }.observes('model.query.json'),

});

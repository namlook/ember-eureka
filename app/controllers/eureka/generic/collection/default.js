import Controller from 'ember-eureka/controller';
import isEmpty from 'ember-eureka/utils/is-empty';

export default Controller.extend({

    /** update the query param: `query` each time
     * the model.query is updated
     */
    queryModelObserver: Ember.observer('model.query.hasChanged', function() {
        if (this.get('queryParams').indexOf('query') > -1) {
            var query = this.get('model.query');
            var queryQP;
            if (query && !isEmpty(query)) {
                queryQP = this.get('model.query.json');
            } else {
                queryQP = null;
            }
            this.set('query', queryQP);
        }
    })

});

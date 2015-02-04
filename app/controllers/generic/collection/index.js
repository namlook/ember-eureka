import Controller from 'ember-eureka/controller';

export default Controller.extend({

    queryParams: ['query'],
    query: null,

    _queryUpdater: function() {
        var query = this.get('model.query');
        if (query) {
            this.set('query', JSON.stringify(query));
        }
    }.observes('model.query')
});

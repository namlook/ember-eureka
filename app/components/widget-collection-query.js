import CollectionWidget from 'ember-eureka/collection-widget';

export default CollectionWidget.extend({

    queryText: function() {
        var query = this.get('routeModel.query');
        return JSON.stringify(query);
    }.property('routeModel.query'),

    _queryTextObserver: function() {
        var queryText = this.get('queryText');
        var query = null;
        try {
            query = JSON.parse(queryText);
        } catch (e) {
            console.log('bad query');
        }
        if (query) {
            this.set('routeModel.query', query);
        }
    }.observes('queryText')

});

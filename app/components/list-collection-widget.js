import CollectionWidget from 'ember-eureka/collection-widget';

export default CollectionWidget.extend({

    results: function() {
        var query = this.get('routeModel.query') || {};
        return this.get('modelStore').find(query);
    }.property('routeModel.query'),

});

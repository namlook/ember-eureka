import WidgetCollection from 'ember-eureka/widget-collection';

export default WidgetCollection.extend({

    queryParams: null,

    collection: function() {
        var query = this.get('routeModel.query') || {};
        return this.get('modelStore').find(query);
    }.property('routeModel.query'),

});

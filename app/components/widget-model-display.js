import ModelWidget from 'ember-eureka/model-widget';

export default ModelWidget.extend({
    model: function() {
        return this.get('routeModel');
    }.property('routeModel')
});

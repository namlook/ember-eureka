import Widget from 'ember-eureka/widget';

export default Widget.extend({
    model: function() {
        return this.get('routeModel');
    }.property('routeModel')
});

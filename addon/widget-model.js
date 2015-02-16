import Ember from 'ember';
import Widget from 'ember-eureka/widget';

export default Widget.extend({
    model: Ember.computed.alias('routeModel')
});

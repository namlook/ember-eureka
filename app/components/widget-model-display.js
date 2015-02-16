import Ember from 'ember';
import ModelWidget from 'ember-eureka/model-widget';

export default ModelWidget.extend({
    fields: Ember.computed.alias('model._fields')
});

import Ember from 'ember';
import WidgetModel from 'ember-eureka/widget-model';

export default WidgetModel.extend({
    fields: Ember.computed.alias('model._fields')
});

import Ember from 'ember';

export default Ember.TextField.extend({
    classNames: ['form-control'],
    type: 'number',
    value: Ember.computed.alias('field.value')
});
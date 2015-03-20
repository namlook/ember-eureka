import Ember from 'ember';

export default Ember.TextField.extend({
    type: 'text',
    classNames: ['form-control'],
    value: Ember.computed.alias('field.value')
});

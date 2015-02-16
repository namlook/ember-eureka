import Ember from 'ember';

export default Ember.TextField.extend({
    type: 'text',
    value: Ember.computed.alias('field.value')
});

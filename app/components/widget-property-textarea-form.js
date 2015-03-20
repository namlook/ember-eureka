import Ember from 'ember';

export default Ember.TextArea.extend({
    classNames: ['form-control'],
    value: Ember.computed.alias('field.value')
});
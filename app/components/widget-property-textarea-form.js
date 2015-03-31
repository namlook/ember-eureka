import Ember from 'ember';

export default Ember.TextArea.extend({
    classNames: ['form-control'],
    rows: 4,
    value: Ember.computed.alias('field.value')
});
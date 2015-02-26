
import Ember from 'ember';

export default Ember.Object.extend({
    meta: null,
    value: null,
    model: null,

    hasValue: Ember.computed.notEmpty('value'),

    /** observes the value and update the
     * model content if needed
     */
    _valueObserver: function() {
        var fieldName = this.get('meta.name');
        var value = this.get('value');
        this.set('model.'+fieldName, value);
    }.observes('value'),
});
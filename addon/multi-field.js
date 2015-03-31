
import Ember from 'ember';

export default Ember.Object.extend({
    meta: null,
    values: null,
    model: null,

    _initValues: function() {
        if (!this.get('values')) {
            this.set('values', Ember.A());
        }
    }.on('init'),

    hasValue: Ember.computed.alias('values'),

    /** observes the values and update the model content
     * if needed
     */
    _valuesObserver: function() {
        var values = this.get('values');
        var fieldName = this.get('meta.name');
        var meta = this.get('meta');
        if (values.length && !meta.get('isRelation')) {
            values = values.mapBy('value').compact();

        }
        this.set('model.'+fieldName, values);
    }.observes('values.@each.value')
});
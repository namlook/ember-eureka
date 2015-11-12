
import Ember from 'ember';

export default Ember.Object.extend({
    meta: null,
    values: null,
    model: null,

    _initValues: Ember.on('init', function() {
        if (!this.get('values')) {
            this.set('values', Ember.A());
        }
    }),

    hasValue: Ember.computed.alias('values'),

    /** observes the values and update the model content
     * if needed
     */
    _valuesObserver: Ember.observer('values.@each.value', function() {
        var values = this.get('values');
        var fieldName = this.get('meta.name');
        var meta = this.get('meta');
        if (values.length && !meta.get('isRelation')) {
            values = values.mapBy('value').compact();

        }
        this.set(`model.${fieldName}`, values);
    })
});
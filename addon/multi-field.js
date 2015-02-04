
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

    _triggerModelChanges: function() {
        var values = this.get('values');
        var meta = this.get('meta');
        if (values.length && !meta.get('isRelation')) {
            values = values.mapBy('value');
        }
        this.get('model')._triggerFieldChanges(this, values);
    }.observes('values.[]')
});
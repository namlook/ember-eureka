
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
        this.get('model')._triggerFieldChanges(this, this.get('values'));
    }.observes('values.[]')
});
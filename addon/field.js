
import Ember from 'ember';

export default Ember.Object.extend({
    meta: null,
    value: null,
    model: null,

    _valueObserver: function() {
        this.get('model')._triggerFieldChanges(this, this.get('value'));
    }.observes('value'),
});
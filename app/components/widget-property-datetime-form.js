/* global moment */
import Ember from 'ember';

export default Ember.Component.extend({
    value: Ember.computed('field.value', {
        get: function() {
            return moment(this.get('field.value')).format('YYYY-MM-DDThh:mm');
        },
        set: function(key, value) {
            this.set('field.value', new Date(value));
            return value;
        }
    })
});

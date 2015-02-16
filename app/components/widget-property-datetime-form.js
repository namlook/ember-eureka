/* global moment */
import Ember from 'ember';

export default Ember.Component.extend({
    value: function(key, value) {
        if (arguments.length === 1) {
            return moment(this.get('field.value')).format('YYYY-MM-DDThh:mm');
        } else {
            this.set('field.value', new Date(value));
            return value;
        }
    }.property('field.value')
});

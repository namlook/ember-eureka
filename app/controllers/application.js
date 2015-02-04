
import Ember from 'ember';

export default Ember.Controller.extend({

    meta: function() {
        return this.get('config.structure.application');
    }.property('config.structure.application'),

    name: function() {
        return this.get('meta.name');
    }.property('meta.name')
});

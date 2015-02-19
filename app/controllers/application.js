
import Ember from 'ember';

export default Ember.Controller.extend({

    meta: Ember.computed.alias('appConfig.structure.application'),
    name: Ember.computed.alias('meta.name')

});

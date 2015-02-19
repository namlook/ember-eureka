import Ember from 'ember';
import Controller from 'ember-eureka/controller';

export default Controller.extend({

    meta: Ember.computed.alias('applicationController.meta.views')

});

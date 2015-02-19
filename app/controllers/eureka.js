
import Ember from 'ember';

export default Ember.Controller.extend({
    needs: ['application'],

    applicationController: Ember.computed.alias('controllers.application'),
    currentRouteName: Ember.computed.alias('applicationController.currentRouteName'),

    meta: Ember.computed.alias('applicationController.meta.views')
});

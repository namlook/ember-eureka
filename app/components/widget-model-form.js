import Ember from 'ember';
import WidgetModel from 'ember-eureka/widget-model';

export default WidgetModel.extend({

    /** if false, display the save button
     */
    isEmbedded: false,
    model: Ember.computed.alias('routeModel'),
    fields: Ember.computed.alias('model._fields'),

    actions: {
        save: function() {
            var model = this.get('model');
            var that = this;
            model.save().then(function(m) {
                that.sendAction('toControllerAction', {name: 'save', payload:m});
            });
        },
        cancel: function() {
            var model = this.get('model');
            model.rollback();
            this.sendAction('toControllerAction', {name: 'cancel', payload: model});
        }
    },

    _focusOnFirstElement: function() {
        this.$('input:eq(0)').focus();
    }.on('didInsertElement'),

    _focusOnNextElement: function() {
        // XXX check li
        this.$().closest('li').next().find('input').focus();
    }.on('willDestroyElement')
});

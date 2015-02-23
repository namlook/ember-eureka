import Ember from 'ember';
import WidgetProperty from 'ember-eureka/widget-property';

export default WidgetProperty.extend({

    /** returns the component name of the non-multi field type
     * so we can create the component dynamically
     */
    propertyComponentName: function() {
        var fieldMeta = this.get('field.meta');
        return fieldMeta.getWidgetComponentName('form', false);
    }.property('field.meta.type'),


    actions: {
        addValue: function() {
            var field = this.get('field');
            field.get('values').pushObject(Ember.Object.create({value: null}));
        },

        removeValue: function(value) {
            var field = this.get('field');
            field.get('values').removeObject(value);
        }
    }
});

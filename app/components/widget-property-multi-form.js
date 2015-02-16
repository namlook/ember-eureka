import Ember from 'ember';
import WidgetProperty from 'ember-eureka/widget-property';

export default WidgetProperty.extend({

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

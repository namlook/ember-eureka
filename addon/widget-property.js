import Ember from 'ember';

/** A WidgetProperty is a component which represent a field on a template
 * The WidgetProperty take a field as param.
 * If the component is not found, the system will resolve to a default
 * one (if it exists). See `field-meta` for more details.
 *
 */
export default Ember.Component.extend({
    field: null,

    fieldMeta: Ember.computed.alias('field.meta'),
    modelMeta: Ember.computed.alias('fieldMeta.modelMeta'),
    resource: Ember.computed.alias('modelMeta.resource')

});

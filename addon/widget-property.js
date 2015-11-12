import Ember from 'ember';

/** A widget property will try to resolve specific components.
 *  Example:
 *
 *  attachment: {
 *       type: <fieldType>
 *       widget: {type: 'file-attachment'}
 *   }
 *
 *  will try to resolve the component `widget-property-file-attachment` and
 *

 *  attachments: {
 *       type: <fieldType>
 *       multi: true
 *       widget: {type: 'file-attachment'}
 *   }
 *
 *  will try to resolve `widget-property-multi-file-attachment` (multi-property)
 */

/** A WidgetProperty is a component which represent a field on a template
 * The WidgetProperty take a field as param.
 * If the component is not found, the system will resolve to a default
 * one (if it exists). See `field-meta` for more details.
 *
 */
export default Ember.Component.extend({
    field: null,

    config: Ember.computed.alias('field.meta.widgetConfig'),

    fieldMeta: Ember.computed.alias('field.meta'),
    model: Ember.computed.alias('field.model'),
    modelMeta: Ember.computed.alias('fieldMeta.modelMeta'),
    resource: Ember.computed.alias('modelMeta.resource'),
    store: Ember.computed.alias('modelMeta.store'),

    currentController: null,

    applicationController: Ember.computed.alias('currentController.applicationController'),
    currentRouteName: Ember.computed.alias('currentController.currentRouteName'),
    fqvn: Ember.computed.alias('currentController.fqvn')
});

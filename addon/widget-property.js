import Ember from 'ember';

/** A Property is a component which represent a field on a template
 * The Property take a field as param
 *
 * The template name resolves like this:
 *
 * - default template: generic-field-display-property
 * - custom model but default field: user-field-display-property
 * - custom model and custom field: user-title-display-property
 *
 * /!\ Adding the template `display-property` will not able the overwriting /!\
 */
export default Ember.Component.extend({
    field: null,

    fieldMeta: Ember.computed.alias('field.meta'),
    modelMeta: Ember.computed.alias('fieldMeta.modelMeta'),
    modelType: Ember.computed.alias('modelMeta.modelType')

});

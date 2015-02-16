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
    modelType: Ember.computed.alias('modelMeta.modelType'),

    _componentName: function() {
        /** hack : get the name of the component class **/
        return this.constructor.toString().split('@')[1].split(':')[1];
    }.property(),

    defaultLayout: Ember.computed(function() {
        var componentName = this.get('_componentName');
        var dasherizedModelType = this.get('modelType').dasherize();
        var fieldName = this.get('fieldMeta.name');
        console.log('>>', 'template:components/'+dasherizedModelType+'-'+fieldName+'-'+componentName);
        if (this.container.resolve('template:components/'+dasherizedModelType+'-'+fieldName+'-'+componentName)) {
            componentName = dasherizedModelType+'-'+fieldName+'-'+componentName;
            console.log('yessss', componentName);
        } else if (this.container.resolve('template:components/'+dasherizedModelType+'-field-'+componentName)) {
            componentName = dasherizedModelType+'-field-'+componentName;

        } else {
            componentName = 'generic-field-'+componentName;
        }
        return this.container.lookup('template:components/' + componentName);
    })

});

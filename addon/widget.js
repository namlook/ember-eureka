import Ember from 'ember';

/** A Widget is a component with a default behavior
 * The Widget take as params the routeModel.
 * If the widget name starts with "generic-", then it is
 * possible to overwrite its template for a specific model type.
 *
 * Example templates for the widget `example-widget`:
 *     - templates/components/generic-example-widget
 *     - templates/components/user-example-widget
 *
 * /!\ Adding the template `example-widget` will not able the overwriting /!\
 */
export default Ember.Component.extend({
    classNames: ['eureka-widget'],
    classNameBindings: ['bsColumns'],

    bsColumns: function() {
        var columns = this.get('config.columns');
        return 'col-sm-'+columns;
    }.property('config.columns'),


    routeModel: null,

    modelMeta: function() {
        return this.get('routeModel.meta');
    }.property('routeModel.meta'),

    modelStore: function() {
        return this.get('modelMeta.store');
    }.property('modelMeta.store'),

    modelType: function() {
        return this.get('modelMeta.modelType');
    }.property('modelMeta.modelType'),


    widgetName: function() {
        /** hack : get the name of the component class **/
        return this.constructor.toString().split('@')[1].split(':')[1];
    }.property(),


    defaultLayout: Ember.computed(function() {
        var widgetName = this.get('widgetName');
        var dasherizedModelType = this.get('modelType').dasherize();
        if (this.container.resolve('template:components/'+dasherizedModelType+'-'+widgetName)) {
            widgetName = dasherizedModelType+'-'+widgetName;
        } else {
            widgetName = 'generic-'+widgetName;
        }
        return this.container.lookup('template:components/' + widgetName);
    })

});

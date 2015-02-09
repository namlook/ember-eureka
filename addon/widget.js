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

    /** the configuration of the widget take from the structure
     * and passed by the widgets-grid
     */
    config: null,

    routeModel: null,
    application: null,

    modelMeta: Ember.computed.alias('routeModel.meta'),
    modelStore: Ember.computed.alias('modelMeta.store'),
    modelType: Ember.computed.alias('modelMeta.modelType'),


    bsColumns: function() {
        var columns = this.get('config.columns') || '12';
        return 'col-sm-'+columns;
    }.property('config.columns'),


    widgetName: function() {
        /** hack : get the name of the component class **/
        var name = this.constructor.toString().split('@')[1].split(':')[1];
        if (!name) {
            console.error('cannot load widget name from', this.constructor.toString());
        }
        return name;
    }.property(),


    defaultLayout: Ember.computed(function() {
        var widgetName = this.get('widgetName');
        var modelType = this.get('modelType');
        if (!modelType) {
            console.error('cannot load widget: modelType is null');
        }
        var dasherizedModelType = this.get('modelType').dasherize();
        if (this.container.resolve('template:components/'+dasherizedModelType+'-'+widgetName)) {
            widgetName = dasherizedModelType+'-'+widgetName;
        } else {
            widgetName = 'generic-'+widgetName;
        }
        return this.container.lookup('template:components/' + widgetName);
    })

});

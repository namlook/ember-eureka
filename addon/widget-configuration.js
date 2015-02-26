import Ember from 'ember';

export default Ember.Object.extend({

    /** we need the container in order to resolve the componentName
     */
    _container: null,

    /** if the widget is an "application widget", the
     * scope is `application`, `model` otherwise.
     */
    _scope: null,

    /** a widget takes 12 columns by default
     */
    columns: 12,

    /** returns true if the widget is an outlet
     */
    isOutlet: Ember.computed.equal('type', 'outlet'),

    /** return the name of the widget composant.
     * It not composant is found for a specific model,
     * fallback to the generic one (if possible).
     *
     * Example:
     *    - if `user-widget-model-form` doesn't resolve
     *    - use `widget-model-form`
     */
    componentName: function() {
        var componentName;
        var widgetName = this.get('type');
        var scope = this.get('_scope');
        var container = this.get('_container');

        if (scope === 'application') {

            componentName = 'widget-'+widgetName;

        } else {
            var modelType = scope;

            if (!modelType) {return console.error('unkown modelType', this.get('routeModel'));}

            var dasherizedModelType = modelType.dasherize();
            componentName = dasherizedModelType+'-widget-'+widgetName;

            if (!container.resolve('component:'+componentName)) {
                componentName = 'widget-'+widgetName;
            }
        }

        if (!container.resolve('component:'+componentName)) {
            console.error('component', componentName, 'not found, please create it.');
        }
        return componentName;
    }.property('_scope', 'type')
});
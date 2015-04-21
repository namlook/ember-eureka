import Widget from 'ember-eureka/widget';

export default Widget.extend({
    classNames: ['eureka-dynamic-widget'],
    classNameBindings: ['componentName', 'bsColumns', 'controller.routeName'], // TODO handle routeName correctly

    /** required attributes */
    config: null,
    routeModel: null,
    currentController: null,

    /** if true, just yield the content (it should be
     * the outlet passed to the widget-container
     */
    yieldOutlet: false,

    /** return the name of the widget composant.
     * It not composant is found for a specific model,
     * fallback to the generic one (if possible).
     *
     * Example:
     *    - if `user-widget-model-form` doesn't resolve
     *    - use `widget-model-form`
     */
    componentName: function() {
        // var componentName;
        var widgetName = this.get('config.type');
        // var resource = this.get('resource');
        // var container = this.container;

        // if (!resource) {

        //     componentName = 'widget-'+widgetName;

        // } else {

        //     if (!resource) {return console.error('unkown resource', this.get('routeModel'));}

        //     var dasherizedModelType = resource.dasherize();
        //     componentName = dasherizedModelType+'-widget-'+widgetName;

        //     if (!container.has('component:'+componentName)) {
        //         componentName = 'widget-'+widgetName;
        //     }
        // }

        // if (!container.has('component:'+componentName)) {
        //     console.error('component', componentName, 'not found, please create it.');
        // }

        // return componentName;
        return 'widget-'+widgetName;
    }.property(/*'resource', */'config.type'),


    actions: {
        // forwards the actions to the parent component (until the controller)
        toControllerAction: function(actionName) {
            this.sendAction('toControllerAction', actionName);
        }
    }
});

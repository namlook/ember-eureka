import Ember from 'ember';

export default Ember.Component.extend({

    routeModel: null,
    currentController: null,

    modelMeta: Ember.computed.alias('routeModel.meta'),
    modelType: Ember.computed.alias('modelMeta.modelType'),

    /** if true, it means that we are into the application level,
     * not the model level
     */
    isApplicationWidgetGrid: Ember.computed.not('modelType'),

    /** if true, and the grid don't have a `widget-outlet` (`hasOutlet` is `false`)
     * then the grid will append an outlet
     */
    yieldOutlet: false,

    hasOutlet: function() {
        return this.get('widgetsConfigList').mapBy('isOutlet').compact().length > 0;
    }.property('widgetsConfigList.@each.isOutlet'),


    /** return the name of the widget composant.
     * It not composant is found for a specific model,
     * fallback to the generic one (if possible).
     *
     * Example:
     *    - if `user-widget-model-form` doesn't resolve
     *    - use `widget-model-form`
     */
    getWidgetComponentName: function(widgetName) {
        var componentName;

        if (this.get('isApplicationWidgetGrid')) {

            componentName = 'widget-'+widgetName;

        } else {

            if (!this.get('modelType')) {return console.error('unkown modelType', this.get('routeModel'));}

            var dasherizedModelType = this.get('modelType').dasherize();
            componentName = dasherizedModelType+'-widget-'+widgetName;

            if (!this.container.resolve('component:'+componentName)) {
                componentName = 'widget-'+widgetName;
            }
        }

        if (!this.container.resolve('component:'+componentName)) {
            console.error('component', componentName, 'not found, please create it.');
        }
        return componentName;
    },


    widgetsConfigList: function() {
        var results = Ember.A();
        var that = this;

        var _widgetsConfig = Ember.A(this.get('currentController.meta.widgets'));

        _widgetsConfig.forEach(function(widget) {

            // we will need the full component name, let's add it here
            var componentName = that.getWidgetComponentName(widget.type);
            widget.componentName = componentName;
            var widgetConf = Ember.Object.create(widget);

            if (widgetConf.get('type') === 'outlet') {
                widgetConf.set('isOutlet', true);
            }

            results.pushObject(widgetConf);
        });
        return results;
    }.property('currentController.meta.widgets'),


    actions: {
        // forwards the actions to the parent component (until the controller)
        toControllerAction: function(actionName) {
            this.sendAction('toControllerAction', actionName);
        }
    }

    // _initializeGrid: function() {
    // }.on('didInsertElement')

});

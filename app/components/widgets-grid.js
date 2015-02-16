
import Ember from 'ember';

var defaultWidgetConfiguration = {
    model: {
        index: {
            widgets: [
                {type: 'model-display'}
            ]
        },
        new: {
            widgets: [
                {type: 'model-form'}
            ]
        },
        edit: {
            widgets: [
                {type: 'model-form'}
            ]
        }
    },
    collection: {
        index: {
            widgets: [
                {type: 'collection-list'}
            ]
        }
    }
};

export default Ember.Component.extend({

    routeModel: null,
    application: null,


    /** the routeName is used to fetch the related widget
     * configuration from the structure (si `_widgetsConfig`)
     */
    routeName: null,
    modelMeta: Ember.computed.alias('routeModel.meta'),
    modelType: Ember.computed.alias('modelMeta.modelType'),

    /** if true, and the grid don't have a `widget-outlet` (`hasOutlet` is `false`)
     * then the grid will append an outlet
     */
    yieldOutlet: false,

    hasOutlet: function() {
        return this.get('widgetsConfigList').mapBy('isOutlet').compact().length > 0;
    }.property('widgetsConfigList.@each.isOutlet'),


    getWidgetComponentName: function(widgetName) {
        var dasherizedModelType = this.get('modelType').dasherize();
        var componentName = dasherizedModelType+'-widget-'+widgetName;

        console.log('1) -', componentName);

        if (!this.container.resolve('component:'+componentName)) {
            componentName = 'widget-'+widgetName;
            console.log('2) -', componentName);
        }

        if (!this.container.resolve('component:'+componentName)) {
            console.error('component', componentName, 'not found, please create it.');
        }

        console.log('#) -', componentName);
        return componentName;
    },

    _getWidgetsConfigList: function() {

        // we need the "widget's path" from the routeName:
        // user.model.index -> model.index
        var path = this.get('routeName').split('.').slice(1).join('.');

        // get the widgets configuration from the structure
        var widgetsConfig = this.get('modelMeta.views.'+path);

        // if no configurations are found, take the default one
        if (!widgetsConfig) {
            widgetsConfig = Ember.get(defaultWidgetConfiguration, path);
        }

        var widgetsConfigList = Ember.get(widgetsConfig, 'widgets');
        return Ember.A(widgetsConfigList);
    },


    widgetsConfigList: function() {
        var results = Ember.A();
        var that = this;

        var _widgetsConfig = this._getWidgetsConfigList();

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
    }.property('routeName'),


    actions: {
        // forwards the actions to the parent component (until the controller)
        toControllerAction: function(actionName) {
            this.sendAction('toControllerAction', actionName);
        }
    }

    // _initializeGrid: function() {
    // }.on('didInsertElement')

});

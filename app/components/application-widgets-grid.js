import Ember from 'ember';

export default Ember.Component.extend({

    routeModel: null,
    application: null,

    /** the application-widgets-grid always needs an outlet
     * if there is no `widget-outlet` the grid will append one
     */
    hasOutlet: function() {
        return this.get('widgetsConfigList').mapBy('isOutlet').compact().length > 0;
    }.property('widgetsConfigList.@each.isOutlet'),

    widgetsConfigList: function() {
        var results = Ember.A();
        var that = this;
        var widgetsConfig = this.get('application.meta.views.widgets');

        widgetsConfig.forEach(function(widget) {

            // we will need the full component name, let's add it here
            var componentName = 'widget-'+widget.type;
            widget.componentName = componentName;
            var widgetConf = Ember.Object.create(widget);

            if (!that.container.resolve('component:'+componentName)) {
                console.error('component', componentName, 'not found, please create it.');
            }

            if (widgetConf.get('type') === 'outlet') {
                widgetConf.set('isOutlet', true);
            }

            results.pushObject(widgetConf);
        });
        return results;
    }.property(),


    actions: {
        // forwards the actions to the parent component (until the controller)
        toControllerAction: function(actionName) {
            this.sendAction('toControllerAction', actionName);
        }
    }
});




import Ember from 'ember';
import Widget from 'ember-eureka/widget';
import WidgetConfiguration from 'ember-eureka/widget-configuration';

export default Widget.extend({ // should has a <div class="row"> as parent...
    classNames: ['widget-container'],

    hasOutlet: function() {
        return this.get('_widgetConfigurationObjects').mapBy('isOutlet').compact().length > 0;
    }.property('_widgetConfigurationObjects.@each.isOutlet'),

    /** if true, and the grid don't have a `widget-outlet` (`hasOutlet` is `false`)
     * then the grid will append an outlet
     */
    yieldOutlet: false,


    /** the widget configurations passed to the container
     */
     widgetConfigurations: null,

    _widgetConfigurationObjects: function() {
       var widgetConfigurations = this.get('widgetConfigurations');
        // if no widgets configuration are specified, use the configuration of the widget
        if (!widgetConfigurations) {
            widgetConfigurations = this.get('config.widgets');
        }

        widgetConfigurations = Ember.A(widgetConfigurations);
        var that = this;
        return widgetConfigurations.map(function(conf) {
            var widgetConf = WidgetConfiguration.create(conf);
            widgetConf.set('_scope', that.get('scope'));
            widgetConf.set('_container', that.container);
            return widgetConf;
        });
    }.property('widgetConfigurations.@each', 'config.widgets.@each'),



    rows: function() {
        var widgetConfigurations = this.get('_widgetConfigurationObjects');

        var nbRows = 0;
        var rows = Ember.A();
        var row = Ember.A();

        Ember.A(widgetConfigurations).forEach(function(widgetConf) {

            row.pushObject(widgetConf);

            nbRows += widgetConf.get('columns');
            if (nbRows === 12) {
                rows.pushObject(row);
                row = Ember.A();
                nbRows = 0;
            }
        });
        return rows;
    }.property('_widgetConfigurationObjects.@each'),

    actions: {
        // forwards the actions to the parent component (until the controller)
        toControllerAction: function(actionName) {
            this.sendAction('toControllerAction', actionName);
        }
    }

});

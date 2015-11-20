import Ember from 'ember';
import Widget from 'ember-eureka/widget';

export default Widget.extend({
    classNames: ['widget-container'],
    classNameBindings: ['bsColumns', 'dasherizedFqvn'],


    /** required attributes */
    config: null,
    routeModel: null,
    currentController: null,

    /** set it to `true` if the container has an outlet to yield */
    yieldOutlet: false,

    label: Ember.computed.alias('config.label'),

    rows: Ember.computed('config.widgets.[]', function() {
        var widgetConfigurations = Ember.A(this.get('config.widgets'));

        var nbRows = 0;
        var rows = Ember.A();
        var row = Ember.A();

        Ember.A(widgetConfigurations).forEach(function(widgetConf) {

            row.pushObject(widgetConf);

            nbRows += Ember.getWithDefault(widgetConf, 'columns', 12);
            if (nbRows === 12) {
                rows.pushObject(row);
                row = Ember.A();
                nbRows = 0;
            }
        });

        if (nbRows > 0) {
            console.error('WARNING: the grid columns doesnt match 12 in', this.get('config'));
        }

        return rows;
    }),


    dasherizedFqvn: Ember.computed('currentController.fqvn', function() {
        var fqvn = this.get('currentController.fqvn');
        if (fqvn) {
            return fqvn.camelize().dasherize() + '-controller';
        }
    }),


    actions: {
        // forwards the actions to the parent component (until the controller)
        toControllerAction: function(actionName) {
            this.sendAction('toControllerAction', actionName);
        }
    }

});

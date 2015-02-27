import Ember from 'ember';

export default Ember.Component.extend({
    classNames: ['row', 'eureka-container-row'],

    /** lets iterate over the widget configurations to
     *  detect the outlets and the containers so we can
     *  handle their particularity in template
     */
    _detectOutletAndContainerWidgets: function() {
        var widgetConfigurations = this.get('widgetConfigurations');
        widgetConfigurations.forEach(function(conf) {
            if (Ember.get(conf, 'type') === 'outlet') {
                Ember.set(conf, 'isOutlet', true);
            }
            if (Ember.get(conf, 'type') === 'container') {
                Ember.set(conf, 'isContainer', true);
            }
        });
    }.on('init'),

    /** required attributes */
    widgetConfigurations: null,
    routeModel: null,
    currentController: null,

    /** if true, and the grid don't have a `widget-outlet` (`hasOutlet` is `false`)
     * then the grid will append an outlet
     */
    yieldOutlet: false,


    actions: {
        // forwards the actions to the parent component (until the controller)
        toControllerAction: function(actionName) {
            this.sendAction('toControllerAction', actionName);
        }
    }

});

import Ember from 'ember';

export default Ember.Component.extend({
    classNames: ['row', 'eureka-widget-container-row'],

    widgetConfigurations: null,

    /** pass throw the controller and the model */
    currentController: null,
    routeModel: null,

    /** if true, and the grid don't have a `widget-outlet` (`hasOutlet` is `false`)
     * then the grid will append an outlet
     */
    yieldOutlet: false,

    hasOutlet: function() {
        return this.get('widgetConfigurations').mapBy('isOutlet').compact().length > 0;
    }.property('widgetConfigurations.@each.isOutlet'),

    actions: {
        // forwards the actions to the parent component (until the controller)
        toControllerAction: function(actionName) {
            this.sendAction('toControllerAction', actionName);
        }
    }

});

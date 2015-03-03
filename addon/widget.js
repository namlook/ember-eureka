import Ember from 'ember';

/** A Widget is a component with a default behavior
 * The Widget take as params the routeModel.
 * If the widget related component is not found,
 * then the default one is used (see `widgets-grid` for more details)
 */
export default Ember.Component.extend({
    classNames: ['eureka-widget'],

    /** required attributes */
    config: null, // the widget configuration described in structure
    routeModel: null,
    currentController: null,

    applicationController: Ember.computed.alias('currentController.applicationController'),
    currentRouteName: Ember.computed.alias('currentController.currentRouteName'),
    fqvn: Ember.computed.alias('currentController.fqvn'),

    modelMeta: Ember.computed.alias('routeModel.meta'),
    store: Ember.computed.alias('modelMeta.store'),
    resource: Ember.computed.alias('modelMeta.resource'),

    columns: function() {
        return this.getWithDefault('config.columns', 12);
    }.property('config.columns'),

    bsColumns: function() {
        return 'col-sm-' + this.get('columns');
    }.property('columns')

});

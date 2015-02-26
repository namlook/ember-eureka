import Ember from 'ember';

/** A Widget is a component with a default behavior
 * The Widget take as params the routeModel.
 * If the widget related component is not found,
 * then the default one is used (see `widgets-grid` for more details)
 */
export default Ember.Component.extend({
    classNames: ['eureka-widget'],
    classNameBindings: ['bsColumns', 'config.type'],

    /** the configuration of the widget take from the structure
     * and passed by the widgets-grid
     */
    config: null,

    /** return the scope of the widget ("application" or the modelType)
     */
    scope: function() {
        return this.get('modelType') || 'application';
    }.property('modelType'),

    routeModel: null,
    currentController: null,
    applicationController: Ember.computed.alias('currentController.applicationController'),
    currentRouteName: Ember.computed.alias('currentController.currentRouteName'),

    modelMeta: Ember.computed.alias('routeModel.meta'),
    modelStore: Ember.computed.alias('modelMeta.store'),
    modelType: Ember.computed.alias('modelMeta.modelType'),


    bsColumns: function() {
        var columns = this.get('config.columns') || '12';
        return 'col-sm-'+columns;
    }.property('config.columns')

});

import Ember from 'ember';

/** A Widget is a component with a default behavior
 * The Widget take as params the routeModel.
 * If the widget related component is not found,
 * then the default one is used:
 *
 * Example for User model:
 *
 *   - if the component `user-widget-model-display` is not found,
 *   - then fallback to the component `widget-model-display`
 */
export default Ember.Component.extend({
    classNames: ['eureka-widget'],
    classNameBindings: ['bsColumns'],

    /** the configuration of the widget take from the structure
     * and passed by the widgets-grid
     */
    config: null,

    routeModel: null,
    application: null,

    modelMeta: Ember.computed.alias('routeModel.meta'),
    modelStore: Ember.computed.alias('modelMeta.store'),
    modelType: Ember.computed.alias('modelMeta.modelType'),


    bsColumns: function() {
        var columns = this.get('config.columns') || '12';
        return 'col-sm-'+columns;
    }.property('config.columns')

});

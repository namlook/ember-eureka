
import Ember from 'ember';

export default Ember.ObjectProxy.extend({
    name: null,
    modelMeta: null,

    content: function() {
        var name = this.get('name');
        var modelMeta = this.get('modelMeta');
        return modelMeta.get('properties.'+name);
    }.property('name', 'modelMeta'),


    label: function() {
        return this.get('content.label') || this.get('name'); // TODO check i18n
    }.property('content.label', 'name'),


    /** returns the component name of the widget
     * depending of `widgetType` (which can be `form` or `display`)
     */
    getWidgetComponentName: function(widgetType, isMulti) {

        var container = this.get('modelMeta.store.container');
        var dasherizedModelType = this.get('modelMeta.modelType').dasherize();
        var componentName = dasherizedModelType + '-' + this.get('name') + '-widget-property-'+widgetType;

        if (!container.resolve('component:'+componentName)) {
            var propertyWidget = this.get('widget');
            if (propertyWidget) {
                componentName = 'widget-property-' + propertyWidget + '-'+widgetType;

                if (!container.resolve('component:'+componentName)) {
                    console.error('Error: cannot found the property widget', componentName, 'falling back to a generic one');
                    componentName = null;
                }
            } else {
                componentName = null;
            }
        }

        if (componentName === null) {
            if (this.get('isRelation')) {

                if (isMulti) {
                    componentName = 'widget-property-multi-relation-'+widgetType;
                } else {
                    componentName = 'widget-property-relation-'+widgetType;
                }

            } else {

                if (isMulti) {
                    componentName = 'widget-property-multi-'+widgetType;
                } else if (this.get('isText')) {
                    componentName = 'widget-property-text-'+widgetType;
                } else if (this.get('isNumber')) {
                    componentName = 'widget-property-number-'+widgetType;
                } else if (this.get('isBoolean')) {
                    componentName = 'widget-property-bool-'+widgetType;
                } else if (this.get('isDate')) {
                    componentName = 'widget-property-date-'+widgetType;
                } else if (this.get('isDateTime')) {
                    componentName = 'widget-property-datetime-'+widgetType;
                } else {
                    componentName = 'widget-property-text-'+widgetType;
                }
            }
        }
        return componentName;
    },

    displayWidgetComponentName: function() {
        var isMulti = this.get('isMulti');
        return this.getWidgetComponentName('display', isMulti);
    }.property('name', 'modelType'),


    formWidgetComponentName: function() {
        var isMulti = this.get('isMulti');
        return this.getWidgetComponentName('form', isMulti);
    }.property('name', 'modelType'),


    isRelation: function() {
        var modelMeta = this.get('modelMeta');
        var fieldType = this.get('content.type');
        return !!modelMeta.get('store.db')[fieldType];
    }.property('content.type'),


    isMulti: Ember.computed.bool('content.multi'),

    isDate: Ember.computed.equal('type', 'date'),

    isDateTime: Ember.computed.equal('type', 'datetime'),

    isTime: Ember.computed.equal('type', 'time'),


    isText: function() {
        return ['text', 'string'].indexOf(this.get('type')) > -1;
    }.property('type'),


    isNumber: function() {
        return ['float', 'double', 'integer', 'number'].indexOf(this.get('type')) > -1;
    }.property('type'),


    isBoolean: function() {
        return ['bool', 'boolean'].indexOf(this.get('type')) > -1;
    }.property('type')
});
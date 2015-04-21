
import Ember from 'ember';

export default Ember.ObjectProxy.extend({
    name: null,
    modelMeta: null,

    /** if the field type is a relation, then
     * returns the modelMeta of this relation
     */
    relationModelMeta: function() {
        var fieldType = this.get('content.type');
        var relationResource = this.get('modelMeta.store.db')[fieldType]
        if (relationResource) {
            return relationResource.get('modelMeta');
        }
    }.property('modelMeta.store.db', 'content.type'),

    content: function() {
        var name = this.get('name');
        var modelMeta = this.get('modelMeta');
        return modelMeta.get('properties.'+name);
    }.property('name', 'modelMeta'),


    label: function() {
        return this.get('content.label') || this.get('name').dasherize().split('-').join(' '); // TODO check i18n
    }.property('content.label', 'name'),

    widgetConfig: function() {
        var config = this.get('widget');
        if (config) {
            if (typeof(config) === 'string') {
                config = {type: config};
            }
            return config;
        }
    }.property('widget'),


    /** returns the component name of the widget
     * depending of `widgetType` (which can be `form` or `display`)
     */
    getWidgetComponentName: function(widgetType, isMulti) {

        var container = this.get('modelMeta.store.container');
        var dasherizedModelType = this.get('modelMeta.resource').dasherize();
        var componentName = dasherizedModelType + '-' + this.get('name') + '-widget-property-'+widgetType;

        if (!container.resolve('component:'+componentName)) {
            var widget = this.get('widgetConfig');
            if (widget) {
                var multi = '';
                if (this.get('isMulti')) {
                    multi = '-multi';
                }
                componentName = 'widget-property'+ multi + '-' + widget.type + '-'+widgetType;

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
    }.property('name', 'resource'),


    formWidgetComponentName: function() {
        var isMulti = this.get('isMulti');
        return this.getWidgetComponentName('form', isMulti);
    }.property('name', 'resource'),


    isRelation: function() {
        var fieldType = this.get('content.type');
        return !!this.get('modelMeta.store.db')[fieldType];
    }.property('content.type', 'modelMeta.store.db'),


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

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


    displayWidgetComponentName: function() {
        var container = this.get('modelMeta.store.container');
        var dasherizedModelType = this.get('modelMeta.modelType').dasherize();
        var componentName = dasherizedModelType + '-' + this.get('name') + '-property-display';
        if (!container.resolve('component:'+componentName)) {
            var propertyWidget = this.get('widget');
            if (propertyWidget) {
                componentName = 'property-' + propertyWidget + '-display';
                if (!container.resolve('component:'+componentName)) {
                    console.error('Error: cannot found the property widget', componentName, 'falling back to property-display');
                    componentName = 'property-display';
                }
            } else {
                componentName = 'property-display';
            }
        }
        return componentName;
    }.property('name', 'modelType'),


    formWidgetComponentName: function() {
        var container = this.get('modelMeta.store.container');
        var dasherizedModelType = this.get('modelMeta.modelType').dasherize();
        var componentName = dasherizedModelType + '-' + this.get('name') + '-property-form';
        console.log('1) -', componentName);
        if (!container.resolve('component:'+componentName)) {
            var propertyWidget = this.get('widget');
            console.log('@@widget>', propertyWidget);
            if (propertyWidget) {
                componentName = 'property-' + propertyWidget + '-form';
                console.log('2) -', componentName);
                if (!container.resolve('component:'+componentName)) {
                    console.error('Error: cannot found the property widget', componentName, 'falling back to property-form');
                    componentName = 'property-form';
                }
            } else {
                componentName = 'property-form';
                console.log('3) -', componentName);
            }
        }
        console.log('#) -', componentName);
        return componentName;
    }.property('name', 'modelType'),

    isRelation: function() {
        var modelMeta = this.get('modelMeta');
        var fieldType = this.get('content.type');
        return !!modelMeta.get('store.db')[fieldType];
    }.property('content.type'),


    isMulti: Ember.computed.bool('content.multi'),


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
import Ember from 'ember';
import layout from '../templates/components/property-autosuggest';
import {getFieldMeta} from 'ember-eureka/model-meta';


/** return the properties suggestion base on the model meta **/
var getPropertiesSuggestion = function(modelMeta) {
    var propertyNames = modelMeta.get('fieldNames');
    return propertyNames.map(function(name) {
        return {
            id: name,
            label: modelMeta.get(name+'Field.label'),
        };
    });
};

export default Ember.Component.extend({
    layout: layout,
    tagName: 'span',

    modelMeta: null,
    oldProperties: null,

    propertyNames: null,

    /** the selected properties.
     * each property contain the name of the property and
     * and a suggestion list computed from the (relation) model meta
     */
    properties: Ember.computed('modelMeta', 'propertyNames.[]', function() {
        var properties = Ember.A();
        var propertyNames = this.get('propertyNames') || Ember.A();
        var modelMeta = this.get('modelMeta');
        var propertiesSuggestions;

        var name = '';
        if (propertyNames.length) {
            var fieldMeta;
            propertyNames.forEach(function(name, index) {
                fieldMeta = getFieldMeta(propertyNames.slice(0, index+1), modelMeta);
                var propertiesSuggestions = getPropertiesSuggestion(fieldMeta.get('modelMeta'));
                properties.pushObject({name: name, suggestions: propertiesSuggestions});
            });
            name = propertyNames.slice(-1)[0];
            modelMeta = fieldMeta.get('modelMeta');
        } else {
            propertiesSuggestions = getPropertiesSuggestion(modelMeta);
            properties.pushObject({name: name, suggestions: propertiesSuggestions});
        }

        this.set('oldProperties', Ember.A(properties.mapBy('name')));
        return properties;
    }),

    /** return the full property computed **/
    value: Ember.computed('properties.@each.name', function(key, val) {
        if (arguments.length > 1) {
            if (val) {
                this.set('propertyNames', Ember.A(val.split('.')));
            }
            return val;
        }
        return this.get('properties').mapBy('name').without('').join('.');
    }),

    /** monitor the changes in properties and slice it if needed **/
    observesProperties: Ember.observer('properties.@each.name', function() {
        var oldProperties = this.get('oldProperties');
        var properties = this.get('properties');

        var changedPropertyIndex;
        properties.forEach(function(item, index) {
            if (oldProperties.objectAt(index) !== item.name) {
                changedPropertyIndex =  index;
                return;
            }
        });

        if (changedPropertyIndex != null) {
            properties.removeObjects(properties.slice(changedPropertyIndex+1));
            this.set('oldProperties', Ember.A(properties.mapBy('name')));
        }
    }),

    /** return true if we should display the expand button **/
    showExpandButton: Ember.computed('relationModelMeta', 'properties.@each.name', function() {
        var propertyNames = this.get('properties').mapBy('name');
        if (this.get('relationModelMeta') && propertyNames.indexOf('') === -1) {
            return true;
        }
        return false;
    }),

    /** display the collapseButotn only if :
     *    - a new suggestion input is displayed
     *    - and the full property is a relation
     *    - and the expandButton is hidden
     */
    showCollapseButton: Ember.computed('properties.[]', 'showExpandButton', 'relationModelMeta', function() {
        return this.get('properties.length') > 1 &&
               this.get('relationModelMeta') &&
               !this.get('showExpandButton');
    }),

    /** return the model meta of the full property if it's a relation */
    relationModelMeta: Ember.computed('properties.@each.name', 'modelMeta', function() {
        var properties = this.get('properties').mapBy('name').without('');
        var modelMeta = this.get('modelMeta');
        var fieldMeta = getFieldMeta(properties, modelMeta);
        if (fieldMeta && fieldMeta.get('isRelation')) {
            return fieldMeta.get('relationModelMeta');
        }
    }),

    actions: {
        /** expand the property if it is a relation **/
        expandProperty: function() {
            var relationModelMeta = this.get('relationModelMeta');
            var propertiesSuggestions = getPropertiesSuggestion(relationModelMeta);
            this.get('properties').pushObject({name: '', suggestions: propertiesSuggestions});
        },

        /** collapse the property. Mainly useful if a suggestion
         * input has been added and we don't need it anymore
         */
        collapseProperty: function() {
            return this.get('properties').popObject();
        }
    }


});

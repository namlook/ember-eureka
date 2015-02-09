
import Ember from 'ember';

export default Ember.ObjectProxy.extend({
    title: null,
    modelMeta: null,

    content: function() {
        var title = this.get('title');
        var modelMeta = this.get('modelMeta');
        return modelMeta.get('properties.'+title);
    }.property('title', 'modelMeta'),

    label: function() {
        return this.get('content.label') || this.get('title'); // TODO check i18n
    }.property('content.label', 'title'),

    isRelation: function() {
        var modelMeta = this.get('modelMeta');
        var fieldType = this.get('content.type');
        return !!modelMeta.get('store.db')[fieldType];
    }.property('content.type'),

    isMulti: function() {
        return !!this.get('content.multi');
    }.property('content.multi'),

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
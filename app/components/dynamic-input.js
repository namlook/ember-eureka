import Ember from 'ember';

/** DynamicInput
 * A dynamic input takes the field value and its meta
 */
export default Ember.Component.extend({
    fieldValue: null,
    fieldMeta: null,

    isNumber: function() {
        return ['integer', 'float', 'number'].indexOf(this.get('fieldMeta.type')) > -1;
    }.property('fieldMeta.type'),

    isBoolean: function() {
        return ['boolean', 'bool'].indexOf(this.get('fieldMeta.type')) > -1;
    }.property('fieldMeta.type'),

    isDate: function() {
        return this.get('fieldMeta.type') === 'date';
    }.property('fieldMeta.type'),

    isDateTime: function() {
        return this.get('fieldMeta.type') === 'datetime';
    }.property('fieldMeta.type'),

    isTime: function() {
        return this.get('fieldMeta.type') === 'time';
    }.property('fieldMeta.type'),

    isRelation: function() {
        return this.get('fieldMeta.isRelation');
    }.property('fieldMeta.isRelation'),

    keyPress: function(e) {
        if (e.charCode === 13) {
            this.sendAction('onEnter', this.get('fieldValue'));
        }
    }
});

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

    isDate: Ember.computed.equal('fieldMeta.type', 'date'),
    isDateTime: Ember.computed.equal('fieldMeta.type', 'datetime'),
    isTime: Ember.computed.equal('fieldMeta.type', 'time'),

    isRelation: Ember.computed.bool('fieldMeta.isRelation'),

    keyPress: function(e) {
        if (e.charCode === 13) {
            this.sendAction('onEnter', this.get('fieldValue'));
        }
    }
});

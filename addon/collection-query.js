import Ember from 'ember';

export default Ember.ArrayProxy.extend({

    onInit: Ember.on('init', function() {
        this.set('content', Ember.A());
    }),


    hasChanged: 0,

    queryChangedObserver: Ember.observer('content.@each.value', function() {
        this.incrementProperty('hasChanged');
    }),


    raw: Ember.computed('hasChanged', {
        get: function() {
            return this._toObject();
        },
        set: function(key, value) {
            this._update(value);
            return this._toObject();
        }
    }),


    json: Ember.computed('hasChanged', function() {
        return JSON.stringify(this._toObject());
    }),


    _update: function(query) {
        var queryList = Ember.A();
        var item;
        query = query || {};
        Object.keys(query).forEach(function(key) {
            var value = query[key];
            if (value !== undefined) {
                item = Ember.Object.create();
                item.set('field', key);
                item.set('value', query[key]);
                queryList.pushObject(item);
            }
        });
        this.set('content', queryList);
        return queryList;
    },

    _toObject: function() {
        var query = {};
        this.get('content').forEach(function(item) {
            query[item.get('field')] = item.get('value');
        });
        return query;
    }

});
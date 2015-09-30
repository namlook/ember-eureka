import Ember from 'ember';

export default Ember.ArrayProxy.extend({

    onInit: function() {
        this.set('content', Ember.A());
    }.on('init'),


    hasChanged: 0,

    queryChangedObserver: function() {
        this.incrementProperty('hasChanged');
    }.observes('content.@each.value'),


    raw: Ember.computed('hasChanged', {
        get: function() {
            return this._toObject();
        },
        set: function(key, value) {
            this._update(value);
        }
    }),


    json: function() {
        return JSON.stringify(this._toObject());
    }.property('hasChanged'),


    _update: function(query) {
        var queryList = Ember.A();
        var item;
        query = query || {};
        Ember.keys(query).forEach(function(key) {
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
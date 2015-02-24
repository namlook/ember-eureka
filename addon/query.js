import Ember from 'ember';

export default Ember.ArrayProxy.extend({

    onInit: function() {
        this.set('content', Ember.A());
    }.on('init'),


    hasChanged: 0,

    queryChangedObserver: function() {
        this.incrementProperty('hasChanged');
    }.observes('content.@each'),


    raw: function(key, value) {
        if (arguments.length === 1) {
            return this._toObject();
        } else {
            this._update(value);
            return value;
        }
    }.property('hasChanged'),


    json: function() {
        return JSON.stringify(this.get('raw'));
    }.property('hasChanged'),


    _update: function(query) {
        var queryList = Ember.A();
        var item;
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
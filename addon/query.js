import Ember from 'ember';

export default Ember.ArrayProxy.extend({

    onInit: function() {
        this.set('content', Ember.A());
    }.on('init'),

    raw: function(key, value) {
        if (arguments.length === 1) {
            return this.toObject();
        } else {
            this.update(value);
            return value;
        }
    }.property('content.@each.field'),

    update: function(query) {
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

    toObject: function() {
        var query = {};
        this.get('content').forEach(function(item) {
            query[item.get('field')] = item.get('value');
        });
        return query;
    },

    toJSON: function() {
        return JSON.stringify(this.get('raw'));
    }

});
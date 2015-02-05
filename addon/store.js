
/** A store is like a model instance factory.
 *  Its purpose is to deal with the stored data
 */

import Ember from 'ember';
import ModelMeta from './model-meta';

export default Ember.Object.extend({
    db: null,
    modelType: null,
    modelClass: null,
    modelStructure: null,

    /** build computed property for all relations
     * this computed property will return a promise
     * will all the relation data
     */
    _addRelationComputedPropertiesToModelClass: function() {
        var computedProperties = {};
        var relationComputedFunction;
        var modelMeta = this.get('modelMeta');
        this.get('modelMeta.relationFieldNames').forEach(function(fieldname) {
            var fieldMeta = modelMeta.get(fieldname+'Field');
            if (fieldMeta.get('isMulti')) {

                relationComputedFunction = function() {
                    var db = this.get('meta.store.db');
                    var value = this.get('content.'+fieldname);
                    if (value && value.length) {
                        var relationIds = this.get('content.'+fieldname).mapBy('_id');
                        var relationType = this.get('meta.'+fieldname+'Field.type');
                        return db[relationType].find({_id: {$in: relationIds}});
                    }
                }.property('content.'+fieldname);

            } else {

                relationComputedFunction = function() {
                    var db = this.get('meta.store.db');
                    var relationId = this.get('content.'+fieldname+'._id');
                    if (relationId) {
                        var relationType = this.get('meta.'+fieldname+'Field.type');
                        return db[relationType].first({_id: relationId});
                    }
                }.property('content.'+fieldname);
            }
            computedProperties[fieldname] = relationComputedFunction;
        });
        this.get('modelClass').reopen(computedProperties);
    }.observes('modelClass').on('init'),

    resourceEndpoint: function() {
        var db = this.get('db');
        var modelType = this.get('modelType');
        var underscoredModelType = modelType.underscore();
        return db.get('endpoint')+'/'+underscoredModelType;
    }.property('modelType'),

    modelMeta: function() {
        var modelType = this.get('modelType');
        var modelStructure = this.get('modelStructure');
        return ModelMeta.create({
            modelType: modelType,
            store: this,
            content: modelStructure
        });
    }.property('modelType'),

    createRecord: function(record) {
        record = record || Ember.Object.create({});
        var modelMeta = this.get('modelMeta');
        return this.get('modelClass').create({
            content: record,
            meta: modelMeta
        });
    },

    first: function(query) {
        query = query || {};
        if (!query._id) {
            console.log('!!!! no id', query);
            return this.createRecord({});
        }
        query._limit = 1;

        var that = this;
        var resourceEndpoint = this.get('resourceEndpoint');

        var promise = new Ember.RSVP.Promise(function(resolve, reject) {
            Ember.$.getJSON(resourceEndpoint, query, function(data){
                var record;
                var content = {};
                // if there is a match, we wrap all relations with Model objects
                if (data.results.length > 0) {
                    content = data.results[0];
                }
                // build the model
                record = that.createRecord(content);
                return resolve(record);
            }, function(infos) {
                console.log('XXXX', infos);
                return reject(infos);
            });
        });
        return Ember.ObjectProxy.extend(Ember.PromiseProxyMixin).create({
            promise: promise
        });
    },

    find: function(query) {
        if (!query) {
            query = {};
        }
        var resourceEndpoint = this.get('resourceEndpoint');
        var that = this;

        var promise = new Ember.RSVP.Promise(function(resolve, reject) {
            Ember.$.getJSON(resourceEndpoint, query).done(function(data){
                var results = Ember.A(); // TODO switch to Collection.create(data);
                var record;
                data.results.forEach(function(item) {
                    record = that.createRecord(item);
                    results.pushObject(record);
                });
                return resolve(results);
            });
        });

        return Ember.ArrayProxy.extend(Ember.PromiseProxyMixin).create({
            promise: promise
        });
    },

    sync: function(pojo) {
        var resourceEndpoint = this.get('resourceEndpoint');
        var postData = {payload: JSON.stringify(pojo)};
        var that = this;
        var promise = new Ember.RSVP.Promise(function(resolve, reject) {
            Ember.$.post(resourceEndpoint, postData, function(data) {
                var record = that.createRecord(data.object);
                resolve(record);
            });
        });
        return Ember.ObjectProxy.extend(Ember.PromiseProxyMixin).create({
            promise: promise
        });
    }

});

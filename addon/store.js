import Ember from 'ember';
import ModelMeta from './model-meta';

/** computed property function for relation fields
 */
var _relationCPFunction = function(fieldMeta) {
    var relationComputedFunction;
    var fieldName = fieldMeta.get('name');

    // deals with multi relation field
    if (fieldMeta.get('isMulti')) {

        // "this" represents the model
        relationComputedFunction = function(key, value) {
            // setter
            if (arguments.length === 2) {
                this.setField(fieldName, value);
                return value;
            }

            // getter
            var db = this.get('meta.store.db');
            var val = this.get('content.'+fieldName);
            if (val && val.length) {
                var relationIds = this.get('content.'+fieldName).mapBy('_id');
                var relationType = this.get('meta.'+fieldName+'Field.type');
                return db[relationType].find({_id: {$in: relationIds}});
            }
        }.property('content.'+fieldName);

    } else {

        // "this" represents the model
        relationComputedFunction = function(key, value) {

            // getter
            if (arguments.length === 2) {
                this.setField(fieldName, value);
                return value;
            }

            // getter
            var db = this.get('meta.store.db');
            var relationId = this.get('content.'+fieldName+'._id');
            if (relationId) {
                var relationType = this.get('meta.'+fieldName+'Field.type');
                return db[relationType].first({_id: relationId});
            }
        }.property('content.'+fieldName);
    }
    return relationComputedFunction;
};


/** computed property function for regular fields
 */
var _regularCPFunction = function(fieldMeta) {

    // building the computed property function
    // "this" represents the model
    var fieldName = fieldMeta.get('name');
    var isBoolean = fieldMeta.get('isBoolean');
    var fieldComputedFunction = function(key, value) {

        // getter
        if (arguments.length === 1) {
            var val = this.get('content.'+fieldName);
            if (isBoolean) {
                val = !!val;
            }
            return val;

        // setter
        } else {
            if (isBoolean) {
                value = !!value;
            } else if (value === '') {
                value = undefined;
            }
            this.setField(fieldName, value);
            return value;
        }
    }.property('content.'+fieldName);

    return fieldComputedFunction;
};


/** A store is like a model instance factory.
 *  Its purpose is to deal with the stored data
 */
export default Ember.Object.extend({
    db: null,
    resource: null,
    modelClass: null,
    resourceStructure: null,

    /** build computed property for all structure's fields
     * If the field is a relation field, the computed property will
     * return a promise, otherwise, the value from the content
     */
    _buildComputedPropertiesFromStructure: function() {
        var computedProperties = {};
        var computedFunction;
        var modelClass = this.get('modelClass');
        var that = this;
        this.get('modelMeta.fieldNames').forEach(function(fieldName) {

            /** check if the computed property has not already been
             * defined by the developper.
             */
            var skip;
            try {
                skip = modelClass.metaForProperty(fieldName);
            } catch (e) {
                skip = false;
            }

            // set the function
            if (!skip) {

                var fieldMeta = that.get('modelMeta.'+fieldName+'Field');
                if (fieldMeta.get('isRelation')) {
                    computedFunction = _relationCPFunction(fieldMeta);
                } else {
                    computedFunction = _regularCPFunction(fieldMeta);
                }

                computedProperties[fieldName] = computedFunction;
            }
        });
        // update the model class
        modelClass.reopen(computedProperties);
    },

    resourceEndpoint: function() {
        var db = this.get('db');
        var resource = this.get('resource');
        var underscoredModelType = resource.underscore();
        return db.get('endpoint')+'/'+underscoredModelType;
    }.property('resource'),

    modelMeta: function() {
        var resource = this.get('resource');
        var resourceStructure = this.get('resourceStructure');
        return ModelMeta.create({
            resource: resource,
            store: this,
            content: resourceStructure
        });
    }.property('resource'),

    createRecord: function(record) {
        if (record === undefined) {
            record = {};
        }
        record = Ember.Object.create(record);
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
            Ember.$.ajax({
                dataType: "json",
                url: resourceEndpoint,
                async: true,
                data: query,
                success: function(data){
                    var record;
                    var content = {};
                    // if there is a match, we wrap all relations with Model objects
                    if (data.results.length > 0) {
                        content = data.results[0];
                    }
                    // build the model
                    record = that.createRecord(content);
                    return resolve(record);
                },
                error: function(jqXHR, textStatus, errorThrown ) {
                    console.log('errror>', jqXHR, textStatus, errorThrown);
                    reject(jqXHR.responseJSON);
                }
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
            Ember.$.ajax({
                dataType: "json",
                url: resourceEndpoint,
                async: true,
                data: query,
                success: function(data) {
                    var results = Ember.A(); // TODO switch to Collection.create(data);
                    var record;
                    data.results.forEach(function(item) {
                        record = that.createRecord(item);
                        results.pushObject(record);
                    });
                    return resolve(results);
                },
                error: function(jqXHR, textStatus, errorThrown ) {
                    console.log('errror>', jqXHR, textStatus, errorThrown);
                    reject(jqXHR.responseJSON);
                }
            });
        });

        return Ember.ArrayProxy.extend(Ember.PromiseProxyMixin).create({
            promise: promise
        });
    },

    facets: function(facetField, query) {
        if (!facetField) {
            console.error('facetField is required');
        }

        if(!query) {
            query = {};
        }
        var resourceEndpoint = this.get('resourceEndpoint')+'/facets/'+facetField;

        var that = this;
        var promise = new Ember.RSVP.Promise(function(resolve, reject) {
            Ember.$.ajax({
                dataType: "json",
                url: resourceEndpoint,
                async: true,
                data: query,
                success: function(data) {
                    var results = Ember.A(); // TODO switch to Collection.create(data);
                    // var record;
                    data.results.forEach(function(item) {
                        // record = that.first({_id: item.facet});
                        // record.then(function(arf) {
                        //     console.log(arf);
                        // });
                        results.pushObject(item);
                    });
                    return resolve(results);
                },
                error: function(jqXHR, textStatus, errorThrown ) {
                    console.log('errror>', jqXHR, textStatus, errorThrown);
                    reject(jqXHR.responseJSON);
                }
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
            Ember.$.ajax({
                dataType: "json",
                url: resourceEndpoint,
                type: 'post',
                async: true,
                data: postData,
                success: function(data) {
                    var record = that.createRecord(data.object);
                    resolve(record);
                },
                error: function(jqXHR, textStatus, errorThrown ) {
                    console.log('errror>', jqXHR, textStatus, errorThrown);
                    reject(jqXHR.responseJSON);
                }
            });
        });
        return Ember.ObjectProxy.extend(Ember.PromiseProxyMixin).create({
            promise: promise
        });
    },

    delete: function(recordId) {
        var resourceEndpoint = this.get('resourceEndpoint');
        var promise = new Ember.RSVP.Promise(function(resolve, reject) {
            Ember.$.ajax({
                url: resourceEndpoint+'/'+recordId,
                type: 'delete',
                async: true,
                success: function(data) {
                    resolve(data);
                },
                error: function(jqXHR, textStatus, errorThrown ) {
                    console.log('errror>', jqXHR, textStatus, errorThrown);
                    reject(jqXHR.responseJSON);
                }
            });
        });
        return promise;
    }

});

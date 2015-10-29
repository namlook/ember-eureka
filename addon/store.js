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
        relationComputedFunction = Ember.computed(`content.${fieldName}`, {
            get: function() {
                var db = this.get('meta.store.db');
                var val = this.get('content.'+fieldName);
                if (val && val.length) {
                    var relationIds = this.get('content.'+fieldName).mapBy('_id');
                    var relationType = this.get('meta.'+fieldName+'Field.type');
                    return db[relationType].find({filter: {_id: {$in: relationIds}}});
                }
            },
            set: function(key, value) {
                this.setField(fieldName, value);
                return value;
            }
        });

    } else {

        // "this" represents the model
        relationComputedFunction = Ember.computed(`content.${fieldName}`, {
            get: function() {
                var db = this.get('meta.store.db');
                var relationId = this.get('content.'+fieldName+'._id');
                if (relationId) {
                    var relationType = this.get('meta.'+fieldName+'Field.type');
                    return db[relationType].fetch(relationId);
                }
            },
            set: function(key, value) {
                this.setField(fieldName, value);
                return value;
            }
        });
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
    var fieldComputedFunction = Ember.computed(`content.${fieldName}`, {
        get: function() {
            var val = this.get('content.'+fieldName);
            if (isBoolean) {
                val = !!val;
            }
            return val;
        },
        set: function(key, value) {
            if (isBoolean) {
                value = !!value;
            } else if (value === '') {
                value = undefined;
            }
            this.setField(fieldName, value);
            return value;
        }
    });

    return fieldComputedFunction;
};


let jsonApi2record = function(jsonApiData, included) {

    let record = {
        _id: jsonApiData.id,
        _type: jsonApiData.type
    };

    if (jsonApiData.attributes) {
        Object.assign(record, jsonApiData.attributes);
    }

    if (jsonApiData.relationships) {
        for (let rel of Object.keys(jsonApiData.relationships)) {

            let {data} = jsonApiData.relationships[rel];

            if (Ember.isArray(data)) {

                record[rel] = data.map((i) => {
                    let relation = included[`${i.type}:::${i.id}`];
                    if (!relation) {
                        relation = i;
                    }
                    return relation;
                });

            } else {

                let relation = included[`${data.type}:::${data.id}`];
                if (!relation) {
                    relation = data;
                }
                record[rel] = relation;
            }
        }
    }
    return record;
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

    modelMeta: Ember.computed('resource', 'resourceStructure', function() {
        var resource = this.get('resource');
        var resourceStructure = this.get('resourceStructure');
        return ModelMeta.create({
            resource: resource,
            store: this,
            content: resourceStructure
        });
    }),

    createRecord: function(jsonApiRecord, included) {
        included = included || {};
        let record = {};
        if (jsonApiRecord) {
            record = {
                _id: jsonApiRecord.id,
                _type: jsonApiRecord.type
            };

            if (jsonApiRecord.attributes) {
                Object.assign(record, jsonApiRecord.attributes);
            }

            if (jsonApiRecord.relationships) {
                for (let rel of Object.keys(jsonApiRecord.relationships)) {

                    let {data} = jsonApiRecord.relationships[rel];

                    if (Ember.isArray(data)) {

                        record[rel] = data.map((item) => {
                            let relation = included[`${item.type}:::${item.id}`];
                            if (relation) {
                                return this.db[relation.type].createRecord(relation);
                            } else {
                                return {_id: item.id, _type: item.type};
                            }
                        });

                    } else {

                        let relation = included[`${data.type}:::${data.id}`];
                        if (relation) {
                            record[rel] = this.db[relation.type].createRecord(relation);
                        } else {
                            record[rel] = {_id: data.id, _type: data.type};
                        }
                    }
                }
            }
        }

        // return this.createInstance(record);
        record = Ember.Object.create(record);
        let modelMeta = this.get('modelMeta');
        return this.get('modelClass').create({
            content: record,
            meta: modelMeta
        });
    },

    createInstance(record) {
        record = Ember.Object.create(record);
        let modelMeta = this.get('modelMeta');
        return this.get('modelClass').create({
            content: record,
            meta: modelMeta
        });
    },

    fetch: function(id, options) {
        options = options || {};
        if (!id) {
            console.error('!!!! no id');
            return this.createRecord({});
        }

        var that = this;
        var resourceEndpoint = this.get('resourceEndpoint');

        var promise = new Ember.RSVP.Promise(function(resolve, reject) {
            Ember.$.ajax({
                dataType: "json",
                url: `${resourceEndpoint}/${encodeURIComponent(id)}`,
                async: true,
                data: options,
                success: function(data){
                    var record;
                    // build the model
                    record = that.createRecord(data.data);
                    return resolve(record);
                },
                error: function(jqXHR, textStatus, errorThrown ) {
                    console.error('errror>', jqXHR, textStatus, errorThrown);
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
                dataType: 'json',
                url: resourceEndpoint,
                async: true,
                data: query,
                success: function(data) {
                    var results = Ember.A(); // TODO switch to Collection.create(data);
                    let included = {};
                    if (data.included && data.included.length) {
                        for (let item of data.included) {
                            included[`${item.type}:::${item.id}`] = item;
                        }
                    }
                    data.data.forEach(function(item) {
                        let record = that.createRecord(item, included);
                        results.pushObject(record);
                    });
                    return resolve(results);
                },
                error: function(jqXHR, textStatus, errorThrown ) {
                    console.error('errror>', jqXHR, textStatus, errorThrown);
                    reject(jqXHR.responseJSON);
                }
            });
        });

        return Ember.ArrayProxy.extend(Ember.PromiseProxyMixin).create({
            promise: promise
        });
    },

    stream: function(query) {
        if (!query) {
            query = {};
        }
        var resourceEndpoint = this.get('resourceEndpoint');
        var promise = new Ember.RSVP.Promise(function(resolve, reject) {
            Ember.$.ajax({
                dataType: 'json',
                url: `${resourceEndpoint}/i/stream/jsonapi`,
                async: true,
                data: query,
                success: function(fetchedData) {
                    let included = {};
                    if (fetchedData.included && fetchedData.included.length) {
                        for (let item of fetchedData.included) {
                            included[`${item.type}:::${item.id}`] = jsonApi2record(item, {});
                        }
                    }

                    let results = fetchedData.data.map((item) => jsonApi2record(item, included));

                    return resolve(results);
                    // var results = Ember.A(); // TODO switch to Collection.create(data);
                    // let included = {};
                    // if (data.included && data.included.length) {
                    //     for (let item of data.included) {
                    //         included[`${item.type}:::${item.id}`] = item;
                    //     }
                    // }
                    // console.log(':::', included);
                    // data.data.forEach(function(item) {
                    //     let record = that.createRecord(item, included);
                    //     results.pushObject(record);
                    // });
                    // return resolve(results);
                },
                error: function(jqXHR, textStatus, errorThrown ) {
                    console.error('errror>', jqXHR, textStatus, errorThrown);
                    reject(jqXHR.responseJSON);
                }
            });
        });

        return Ember.ArrayProxy.extend(Ember.PromiseProxyMixin).create({
            promise: promise
        });
    },

    /** stream
     * Use `stream` if you want to fetch a lot of data.
     * `stream` is like `find` but can fetch thousand of records
     * while `find` is faster to retreive tens of records.
     * Note that `stream` returns raw data and not Model objects.
     */
    _stream: function(query) {
        if (!query) {
            query = {};
        }
        var resourceEndpoint = this.get('resourceEndpoint');
        var promise = new Ember.RSVP.Promise(function(resolve, reject) {
            Ember.$.ajax({
                dataType: "json",
                url: `${resourceEndpoint}/i/stream/json`,
                async: true,
                data: query,
                success: function(data) {
                    return resolve(data);
                },
                error: function(jqXHR, textStatus, errorThrown ) {
                    console.error('errror>', jqXHR, textStatus, errorThrown);
                    reject(jqXHR.responseJSON);
                }
            });
        });

        return Ember.ArrayProxy.extend(Ember.PromiseProxyMixin).create({
            promise: promise
        });
    },

    groupBy: function(field, query) {
        if (!field) {
            console.error('field is required');
        }

        if(!query) {
            query = {};
        }
        var resourceEndpoint = this.get('resourceEndpoint')+'/i/group-by/'+field;

        var promise = new Ember.RSVP.Promise(function(resolve, reject) {
            Ember.$.ajax({
                dataType: "json",
                url: resourceEndpoint,
                async: true,
                data: query,
                success: function(data) {
                    var results = Ember.A(); // TODO switch to Collection.create(data);
                    // var record;
                    data.data.forEach(function(item) {
                        // record = that.first({_id: item.facet});
                        // record.then(function(arf) {
                        //     console.log(arf);
                        // });
                        results.pushObject(item);
                    });
                    return resolve(results);
                },
                error: function(jqXHR, textStatus, errorThrown ) {
                    console.error('errror>', jqXHR, textStatus, errorThrown);
                    reject(jqXHR.responseJSON);
                }
            });
        });

        return Ember.ArrayProxy.extend(Ember.PromiseProxyMixin).create({
            promise: promise
        });
    },

    count: function(query) {
        if (!query) {
            query = {};
        }
        var resourceEndpoint = this.get('resourceEndpoint')+'/i/count';

        var promise = new Ember.RSVP.Promise(function(resolve, reject) {
            Ember.$.ajax({
                dataType: "json",
                url: resourceEndpoint,
                async: true,
                data: query,
                success: function(data) {
                    return resolve(data.data);
                },
                error: function(jqXHR, textStatus, errorThrown ) {
                    console.error('errror>', jqXHR, textStatus, errorThrown);
                    reject(jqXHR.responseJSON);
                }
            });
        });

        return promise;
    },

    sync: function(method, pojo) {
        method = method || 'post';
        let url = this.get('resourceEndpoint');

        let record = {
            type: this.get('modelMeta.resource')
        };

        if (pojo._id) {
            record.id = pojo._id;

            if (method === 'patch') {
                method = 'patch';
                url = `${url}/${pojo._id}`;
            }
        }

        let relationships = {};
        let attributes = {};

        for (let property of Object.keys(pojo)) {

            if (['_id', '_type'].indexOf(property) > -1) {
                continue;
            }

            let propertyField = this.get(`modelMeta.${property}Field`);
            let isRelation = propertyField.get('isRelation');
            let isArray = propertyField.get('isArray');

            if (isRelation) {
                let relation = pojo[property];

                if (isArray) {

                    if (relation) {
                        relation = relation.map((rel) => {
                            return {id: rel._id, type: rel._type};
                        });
                    } else {
                        relation = [];
                    }

                } else {
                    if (!relation) {
                        relation = null;
                    } else {
                        relation = {id: relation._id, type: relation._type};
                    }
                }

                relationships[property] = {data: relation};
            } else {
                attributes[property] = pojo[property];
            }
        }

        if (Object.keys(attributes).length) {
            record.attributes = attributes;
        }

        if (Object.keys(relationships).length) {
            record.relationships = relationships;
        }

        let postData = {data: record};
        let that = this;
        let promise = new Ember.RSVP.Promise(function(resolve, reject) {
            Ember.$.ajax({
                dataType: 'json',
                url: url,
                type: method,
                async: true,
                data: postData,
                success: function(data) {
                    let record = that.createRecord(data.data);
                    record._id = record.get('_id');
                    resolve(record);
                },
                error: function(jqXHR, textStatus, errorThrown ) {
                    console.error('errror>', jqXHR, textStatus, errorThrown);
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
                    console.error('errror>', jqXHR, textStatus, errorThrown);
                    reject(jqXHR.responseJSON);
                }
            });
        });
        return promise;
    }

});

// var Ember = require('ember');

Eurekapp = (function(clientConfig){

    var App = Ember.Application.create({
        ready: function() {
            Ember.$('title').text(this.get('config').name);
            console.log(this.get('config').name, 'is ready !');
        },

        getModelConfig: function(modelType) {
            return this.config.schemas[modelType];
        },

        getModelSchema: function(modelType) {
            var modelConfig = this.getModelConfig(modelType);
            if (modelConfig) {
                return modelConfig.schema;
            }
        }
    });

    App.Router.map(function() {
        this.resource('type', { path: '/' }, function() {
            this.route('display', {path: '/:type/:id'});
            this.route('edit', {path: '/:type/:id/edit'});
            this.route('new', {path: '/:type/new'});
            this.route('list', {path: '/:type'});
        });
    });

    App.ApplicationConfig = Ember.Object.extend({
        modelNames: function() {
            var _modelNames = [];
            for (var modelName in App.config.schemas){
                _modelNames.push({classified: modelName.camelize().capitalize(), underscored: modelName.underscore()});
            }
            return _modelNames;
        }.property('schemas')
    });

    App.ApplicationRoute = Ember.Route.extend({
        model: function() {
            return App.config;
        }
    });

    App.ApplicationController = Ember.ObjectController.extend({
    });


    App.TypeListRoute = Ember.Route.extend({
        model: function(params) {
            return this.get('db')[params.type.camelize().capitalize()].find();
        },
        renderTemplate: function(controller, model) {
            // template
            var template = 'type/list';
            var type = model.get('type').underscore();
            if (Ember.TEMPLATES[type+'/list']) {
                template = type+'/list';
            }

            // controller
            if (App[model.get('type')+'ListController']) {
                controller = this.controllerFor(model.get('type')+'List');
                controller.set('model', model);
            }
            this.render(template, {controller: controller});
        }
    });


    App.TypeDisplayRoute = Ember.Route.extend({
        model: function(params) {
            var _type = params.type.camelize().capitalize();
            var _id = params.id;
            return this.get('db')[_type].first({_id: _id, _type: _type});
        },
        renderTemplate: function(controller, model) {
            // template
            var template = 'type/display';
            var type = model.get('type').underscore();
            if (Ember.TEMPLATES[type+'/display']) {
                template = type+'/display';
            }

            // controller
            if (App[model.get('type')+'DisplayController']) {
                controller = this.controllerFor(model.get('type')+'Display');
                controller.set('model', model);
            }
            this.render(template, {controller: controller});
        }
    });

    App.TypeNewRoute = Ember.Route.extend({
        model: function(params) {
            var _type = params.type.camelize().capitalize();
            return this.get('db')[_type].get('model').create({content: {}});
        },
        renderTemplate: function(controller, model) {
            // template
            var template = 'type/new';
            var type = model.get('type').underscore();
            if (Ember.TEMPLATES[type+'/new']) {
                template = type+'/new';
            }

            // controller
            if (App[model.get('type')+'NewController']) {
                controller = this.controllerFor(model.get('type')+'New');
                controller.set('model', model);
            }
            this.render(template, {controller: controller});
        }
    });

    /***** Controllers ******/
    App.TypeNewController = Ember.Controller.extend({
        actions: {
            save: function() {
                var _this = this;
                this.get('model').save(function(err, model) {
                    if (err) {
                        return console.log('err', err);
                    }
                    var type = model.get('_type').underscore();
                    var _id = model.get('_id');
                    _this.transitionToRoute('type.display', type, _id);

                });
            }
        }
    });

    // Ember.TEMPLATES = require('./templates');


    /**** Models *****/
    App.Model = Ember.ObjectProxy.extend({
        _modelType: null,
        content: null,
        // _isDirty: false,

        // // These following two functions can be abstracted out to a Mixin
        // init: function () {
        //     var _this = this;
        //     Em.keys(this.get('content')).forEach(function (key) {
        //         Em.addObserver(_this.get('content'), key, _this, 'modelChanged');
        //     });
        // },

        // // Manually removing the observers is necessary.
        // willDestroy: function () {
        //     var _this = this;
        //     Em.keys(this.get('content')).forEach(function (key) {
        //         Em.removeObserver(_this.get('content'), key, _this, 'modelChanged');
        //     });
        // },

        // modelChanged: function() {
        //     console.log('model changed');
        // },
        // _dirtyObserver = function() {
        //     var schema = App.getModelSchema(this.get('_modelType'));
        //     for (var fieldName in schema) {
        //         Ember.addObserver(this, fieldName, this, );
        //     }
        // }.observes('_modelType'),

        // _values: function() {
        //     var _results = Ember.A();
        //     var skipFieldNames = [
        //         '_id', '_type', '_ref', '_uri', '_class',
        //         'title', 'thumb', 'description'
        //     ];

        //     for (var fieldName in this.get('content')) {

        //         if (skipFieldNames.indexOf(fieldName) > -1) {
        //             continue;
        //         }

        //         var value = this.get(fieldName);
        //         if(value) {
        //             _results.push({name: fieldName, value: value});
        //         }
        //     }
        //     return _results.sortBy('name');
        // }.property('content'),


        _values: function() {
            var _results = Ember.A();
            var skipFieldNames = [
                'title', 'thumb', 'description'
            ];
            var _this = this;
            this.get('_fields').forEach(function(field) {
                var fieldName = field.get('name');
                var value = _this.get('content.'+fieldName);

                if (skipFieldNames.indexOf(field.get('name')) > -1) {
                    return;
                }

                if(value) {
                    _results.push({name: fieldName, value: value});
                }
            });
            return _results.sortBy('name');
        }.property().readOnly().volatile(),


        _toJSONObject: function() {
            var pojo = {};
            var content = this.get('content');
            console.log(content);
            var modelSchema = App.getModelSchema(this.get('type'));
            for (var fieldName in content) {
                var isRelation = App.db[this.get('type')].isRelation(fieldName);
                if (content[fieldName] && isRelation) {
                    if (modelSchema[fieldName].multi) {
                        var rels = [];
                        content[fieldName].forEach(function(rel){
                            rels.push(rel._toJSONObject());
                        });
                        pojo[fieldName] = rels;
                    } else {
                        pojo[fieldName] = content[fieldName]._toJSONObject();
                    }
                } else {
                    pojo[fieldName] = content[fieldName];
                }
            }
            return pojo;
        },

        _toJSON: function() {
            return JSON.stringify(this._toJSONObject());
        },

        save: function(callback) {
            console.log(this._toJSON());
            var type = this.get('_modelType');
            var endpoint = App.config.apiURI+'/'+type.underscore();
            var postData = {payload: this._toJSON()};
            Ember.$.post(endpoint, postData, function(data) {
                return callback(null, App.db[type].get('model').create({content: data.object}));
            }).fail(function(jqXHR) {
                alert('An error occured: ', jqXHR.responseText);
                error = jqXHR.responseText;
                if (jqXHR.responseText.error !== undefined) {
                    error = jqXHR.responseText.error;
                }
                return callback(error);
            });

        },

        /**** properties ****/

        _computeField: function(fieldName, fallbackFieldName) {
            var modelConfig = App.getModelConfig(this.get('_modelType'));
            var content;
            fallbackFieldName = fallbackFieldName || fieldName;

            // if a field config is specified (in shemas), take the config, and apply it
            if (modelConfig && modelConfig.display && modelConfig.display[fieldName]) {
                var fieldSchema = modelConfig.display[fieldName];

                // in schemas, values can be functions. If it is the case, call it.
                if (typeof(fieldSchema) === 'function') {
                    return fieldSchema(this);
                }

                // if this is an i18n value
                if (modelConfig.schema[fieldName].i18n) {

                    // if the lang is specified into the config, we just as to use it
                    var fieldContent;
                    if (fieldSchema.indexOf('@') > -1) {
                        fieldSchema = fieldSchema.replace('@', '.');
                        fieldContent = this.get('content.'+fieldSchema);
                    } else {
                        fieldContent = this.get('content.'+fieldSchema).en; // i18n TODO
                    }
                    if (fieldContent) {
                        return fieldContent;
                    }
                } else {
                    return this.get('content.'+fieldSchema);
                }
            }

            // otherwise, get the value from the content of the model
            else if (this.get('content.'+fieldName)) {
                content = this.get('content.'+fieldName);
                if (modelConfig.schema[fieldName].i18n) {
                    return content.en; // i18n TODO
                }
                return content;
            }
            return this.get('content.'+fallbackFieldName);
        },

        type: function() {
            return this.get('content._type') || this.get('_modelType');
        }.property('content._type', '_modelType').readOnly(),

        title: function() {
            return this._computeField('title', '_id');
        }.property('_modelType', 'content.title', '_id'),


        description: function() {
            return this._computeField('description');
        }.property('_modelType'),


        thumb: function() {
            return this._computeField('thumb');
        }.property('_modelType')

    });

    /* ResultSet
     * Contains an array of models returned by a promise
     */
    App.ResultSet = Ember.ArrayProxy.extend({
        type: null,
        schema: null,
        fields: function() {
            var _fields = Ember.A();
            for (var fieldName in this.get('schema')) {
                _fields.push({name: fieldName, structure: this.get('schema')[fieldName]});
            }
            return _fields;
        }.property('schema'),
        content: null
    });

    /* DatabaseModel
     * This object brings some convenients methods for getting results
     * from the server. A `DatabaseModel` is attached to the db and is
     * is related to a specific model.
     *
     * Usage example:
     *    App.db.BlogPost.find()
     */
    App.DatabaseModel = Ember.Object.extend({
        type: null,
        schema: null,
        model: null,

        endpoint: function() {
            return App.config.apiURI+'/'+this.get('type').underscore();
        }.property('App.config.apiURI', 'type'),

        isRelation: function(fieldName) {
            var field = this.get('schema')[fieldName];
            if (field) {
                return !!App.db[field.type];
            }
            return false;
        },

        isMulti: function(fieldName) {
            return !!this.get('schema')[fieldName].multi;
        },

        isI18n: function(fieldName) {
            return !!this.get('schema')[fieldName].i18n;
        },

        getFieldType: function(fieldName) {
            var field = this.get('schema')[fieldName];
            if (field) {
                return field.type;
            }
        },

        find: function(query) {
            var that = this;
            var modelType = this.get('type');
            return new Ember.RSVP.Promise(function(resolve, reject) {
                Ember.$.getJSON(that.get('endpoint'), query, function(data){
                    var results = Ember.A();
                    data.results.forEach(function(item){
                        var obj = that.get('model').create({
                            content: item,
                            _modelType: modelType
                        });
                        results.push(obj);
                    });
                    var resultSet = App.ResultSet.create({
                        type: modelType,
                        schema: that.get('schema'),
                        content: results
                    });
                    return resolve(resultSet);
                });
            });
        },

        first: function(query) {
            var that = this;
            var modelType = this.get('type');
            query._populate = true;
            return new Ember.RSVP.Promise(function(resolve, reject) {
                Ember.$.getJSON(that.get('endpoint'), query, function(data){
                    var obj;
                    var content = {};
                    // if there is a match, we wrap all relations with Model objects
                    if (data.results.length > 0) {
                        content = data.results[0];

                        // for each field, check if it is a relation to wrap
                        for (var key in content) {

                            var value = content[key];
                            var type = that.getFieldType(key);

                            if (that.isRelation(key)) {

                                if (that.isMulti(key)) {

                                    var values = [];

                                    value.forEach(function(item) {
                                        var rel = App.db[type].get('model').create({content: item});
                                        values.push(rel);
                                    });

                                    content[key] = values;
                                }
                                else {
                                    content[key] = App.db[type].get('model').create({content: value});
                                }
                            }
                        }
                    }
                    // build the model
                    obj = that.get('model').create({content: content});
                    return resolve(obj);
                });
            });
        }
    });


    App.ModelField = Ember.Object.extend({
        name: null,
        schema: null,
        content: null,
        valuesChangesCounter: 0,

        init: function() {
            this._super();
            this.set('content', Ember.A());
            if (!this.get('isRelation')) {
                this.get('content').pushObject(Ember.Object.create({value: null}));
            }
        },

        isRelation: function() {
            return !!App.db[this.get('schema').type];
        }.property('schema.type'),

        isMulti: function() {
            return !!this.get('schema').multi;
        }.property('schema.multi'),

        relationModel: function() {
            return App.db[this.get('schema').type].get('model');
        }.property('schema.type'),

        contentLength: function() {
            return this.get('content').length;
        }.property('content.@each.value'),

        valuesObserver: function() {
            this.incrementProperty('valuesChangesCounter');
        }.observes('content.@each.value')
    });

    /*** Components ****/

    App.RenderTemplateComponent = Ember.Component.extend({
        action: null,
        model: null,
        layoutName: function() {
            var action = this.get('action');
            var template = 'type/'+action;
            if (this.get('model')) {
                var type = this.get('model').get('type').underscore();
                if (Ember.TEMPLATES[type+'/'+action]) {
                    template = type+'/'+action;
                }
            }
            return template;
        }.property('template')
    });

    App.ModelFormComponent = Ember.Component.extend({
        model: null,
        isRelation: false,

        layoutName: function() {
            var action = this.get('action');
            var template = 'type/'+action;
            if (this.get('model')) {
                var type = this.get('model').get('type').underscore();
                if (Ember.TEMPLATES[type+'/'+action]) {
                    template = type+'/'+action;
                }
            }
            return template;
        }.property('template'),


        fields: function() {
            var schema = App.getModelSchema(this.get('model').get('type'));
            var fields = Ember.A();
            for (var fieldName in schema) {
                var fieldSchema = schema[fieldName];
                var field = App.ModelField.create({
                    name: fieldName,
                    schema: fieldSchema,
                });

                // fill the content if any values exist in content
                var value = this.get('model').get('content.'+fieldName);
                if (value) {
                    if (!Ember.isArray(value)) {
                        value = [value];
                    }
                    var content = Ember.A();
                    value.forEach(function(val) {
                        content.pushObject(Ember.Object.create({value: val}));
                    });
                    if (content.length) {
                        field.set('content', content);
                    }
                }
                fields.push(field);
            }
            return fields;
        }.property('model').readOnly(),


        _updateContent: function() {
            var _this = this;
            this.get('fields').forEach(function(field){
                var value = null;
                var content = field.get('content');

                if (field.schema.multi) {
                    value = [];
                    content.forEach(function(item){
                        if (item.get('value') !== null) {
                            value.push(item.get('value'));
                        }
                    });
                    if (value.length === 0) {
                       value = null;
                    }
                } else if (content.length) {
                    content = content.objectAt(0);
                    if (content && ['', null, undefined].indexOf(content.get('value')) === -1) {
                        value = content.get('value');
                    }
                }

                _this.get('model').set('content.'+field.get('name'), value);
            });
        },

        _observeFields: function() {
            Ember.run.debounce(this, this._updateContent, 300);
        }.observes('fields.@each.valuesChangesCounter'),

    });

    App.FieldFormComponent = Ember.Component.extend({
        field: null,

        displayAddButton: function() {
            if (this.get('field').get('isMulti')) {
                return true;
            }
            return false;
        }.property('field.isMulti'),

        displayNewButton: function() {
            var field = this.get('field');
            if (!field.get('isMulti') && field.get('isRelation') && field.get('contentLength') === 0) {
                return true;
            }
            return false;
        }.property('field.isMulti', 'field.isRelation', 'field.contentLength'),


        actions: {
            editRelation: function(fieldContent) {
                console.log('edit relation', fieldContent.get('value').get('content'));
                fieldContent.set('_hide', false);
            },
            removeRelation: function(fieldContent) {
                console.log('cancel relation', fieldContent);
                this.get('field').get('content').removeObject(fieldContent);
            },
            doneRelation: function(fieldContent) {
                fieldContent.set('_hide', true);
                console.log('relation done', fieldContent);
            },
            add: function() {
                console.log('add field');
                var item;
                var field = this.get('field');
                if (field.get('isRelation')) {
                    console.log('add relation');
                    if (!field.get('isMulti')) {
                        field.set('content', Ember.A());
                    }
                    item = field.get('relationModel').create({content: {}});
                } else {
                    item = null;
                }
                field.get('content').pushObject(Ember.Object.create({value: item}));
                console.log(field.get('name'), 'nb content', field.get('content').length);
            }
        }

    });


    App.DisplayFieldComponent = Ember.Component.extend({
        value: null,
        fieldName: null,
        modelType: null,

        isArray: function() {
            return Ember.isArray(this.get('value'));
        }.property('value'),

        isRelation: function() {
            var value = this.get('value');
            var modelSchema = App.getModelSchema(this.get('modelType'));
            if (App.getModelSchema(modelSchema[this.get('fieldName')].type)) {
                return true;
            }
            return false;
        }.property('value'),

        isI18n: function() {
            var value = this.get('value');
            var modelSchema = App.getModelSchema(this.get('modelType'));
            if (modelSchema[this.get('fieldName')].i18n) {
                return true;
            }
            return false;
        }.property('value')
    });


    App.DynamicInputComponent = Ember.Component.extend({
        field: null,
        value: null,

        schema: function() {
            return this.get('field.schema');
        }.property('field'),

        type: function() {
            return this.get('schema.type');
        }.property('schema.type'),

        isText: function() {
            return this.get('type') === 'string';
        }.property('type'),

        isNumber: function() {
            var type = this.get('type');
            return ['integer', 'float'].indexOf(type) > -1;
        }.property('type'),

        isBoolean: function() {
            return this.get('type') === 'boolean';
        }.property('type'),

        isDate: function() {
            return this.get('type') === 'date';
        }.property('type')

    });


    /**** Initialization *****/
    // attach the config, and the db to the application
    App.initializer({
        name: "eureka",

        initialize: function(container, application) {
            application.register('eureka:config', App.ApplicationConfig.create(clientConfig), {instantiate: false});
            application.inject('route', 'config', 'eureka:config');
            application.set('config', App.ApplicationConfig.create(clientConfig));
            var database = (function() {
                var db = Ember.Object.create();
                for (var _type in clientConfig.schemas) {
                    var dbTypeObject = App.DatabaseModel.create({
                        type: _type,
                        schema: clientConfig.schemas[_type].schema
                    });
                    var Model;
                    if (App[_type+'Model']) {
                        Model = App[_type+'Model'];
                    } else {
                        Model = App.Model;
                    }
                    Model = Model.extend({_modelType: _type});
                    dbTypeObject.set('model', Model);
                    db.set(_type, dbTypeObject);
                }
                return db;
            })();
            application.register('eureka:db', database, {instantiate: false});
            application.inject('route', 'db', 'eureka:db');
            application.set('db', database);
        }

    });
    return App;
});
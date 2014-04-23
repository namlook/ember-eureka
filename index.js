// var Ember = require('ember');

Eurekapp = (function(clientConfig){

    var App = Ember.Application.create({
        ready: function() {
            Ember.$('title').text(this.get('config').name);
            console.log(this.get('config').name, 'is ready !');
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
            var template = 'type/list';
            if (Ember.TEMPLATES[model.type+'/list']) {
                template = model.type+'/list';
            }
            return this.render(template);
        }
    });


    App.TypeDisplayRoute = Ember.Route.extend({
        model: function(params) {
            var _type = params.type.camelize().capitalize();
            var _id = params.id;
            return this.get('db')[_type].first({_id: _id, _type: _type});
        },
        renderTemplate: function(controller, model) {
            var template = 'type/display';
            if (Ember.TEMPLATES[model.type+'/display']) {
                template = model.type+'/display';
            }
            return this.render(template);
        }
    });

    // Ember.TEMPLATES = require('./templates');


    /**** Models *****/
    App.Model = Ember.ObjectProxy.extend({
        _modelType: null,
        // content: null,

        title: function() {
            var modelConfig = App.config.schemas[this._modelType];
            if (modelConfig && modelConfig.display && modelConfig.display.generic && modelConfig.display.generic.title) {
                var field = modelConfig.display.generic.title.replace('@', '.');
                return this.get('content.'+field);
            }
            else if (this.get('content.title')) {
                var _title = this.get('content.title');
                if (typeof(_title) === 'string') {
                    return _title;
                }
                else if (_title.en) {
                    return _title.en;
                }
            }
            return this.get('_id');
        }.property('content.title', '_id'),

        description: function() {
            var modelConfig = App.config.schemas[this._modelType];
            if (modelConfig && modelConfig.display && modelConfig.display.generic && modelConfig.display.generic.description) {
                var descriptionSchema = modelConfig.display.generic.description;
                if (typeof(descriptionSchema) === 'function') {
                    return descriptionSchema(this);
                }
                var field = descriptionSchema.replace('@', '.');
                return this.get('content.'+field);
            }
            return this.get('content.description');
        }.property('content'),


        image: function() {
            var modelConfig = App.config.schemas[this._modelType];
            if (modelConfig && modelConfig.display && modelConfig.display.generic && modelConfig.display.generic.image) {
                var imgSchema = modelConfig.display.generic.image;
                if (typeof(imgSchema) === 'function') {
                    console.log(imgSchema(this));
                    return imgSchema(this);
                }
                var field = imgSchema.replace('@', '.');
                return this.get('content.'+field);
            }
            return this.get('content.image');
        }.property('content'),


        _values: function() {
            var _results = Ember.A();
            for (var fieldName in this.get('content')) {
                var value = this.get(fieldName);
                if(value) {
                    _results.push({name: fieldName, value: value});
                }
            }
            return _results.sortBy('name');
        }.property('content')
    });

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

                    // if there is a match, we wrap all relations with Model objects
                    if (data.results.length > 0) {
                        var content = data.results[0];

                        // for each field, check if it is a relation to wrap
                        for (var key in content) {

                            var value = content[key];
                            var type = that.getFieldType(key);

                            if (that.isRelation(key)) {

                                if (that.isMulti(key)) {

                                    var values = [];

                                    value.forEach(function(item) {
                                        var rel = App.db[type].get('model').create(item);
                                        values.push(rel);
                                    });

                                    content[key] = values;
                                }
                                else {
                                    content[key] = App.db[type].get('model').create(value);
                                    console.log(type, App.db[type].get('model'), value, content[key], content[key].title);
                                }
                            }
                        }

                        // build the model
                        obj = that.get('model').create({
                            content: content,
                            _modelType: modelType
                        });
                    }
                    else {
                        obj = that.get('model').create({
                            content: {},
                            _modelType: modelType
                        });
                    }
                    return resolve(obj);
                });
            });
        }
    });


    /*** Components ****/
    App.DisplayFieldComponent = Ember.Component.extend({
        value: null,

        isArray: function() {
            return Ember.isArray(this.get('value'));
        }.property('value'),

        isRelation: function() {
            var value = this.get('value');
            if (value._type !== undefined && value._id !== undefined) {
                return true;
            }
            return false;
        }.property('value')
    });

    /**** Handlebars helpers ****/
    Ember.Handlebars.helper('titleize', function(value, options) {
        if (value && value.get && value.get('title') !== undefined) {
            return value.get('title');
        }
        else if (value._id !== undefined) {
            return value._id;
        }
        return value;
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
                    var typeObject = App.DatabaseModel.create({
                        type: _type,
                        schema: clientConfig.schemas[_type].schema
                    });
                    if (App[_type+'Model']) {
                        typeObject.set('model', App[_type+'Model']);
                    } else {
                        typeObject.set('model', App.Model);
                    }
                    db.set(_type, typeObject);
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
// var Ember = require('ember');

Ember.isString = function(obj) {
    return Object.prototype.toString.call(obj) === '[object String]';
};

Ember.isEmpty = function(obj) {
    if ([null, undefined].indexOf(obj) > -1) {
        return true;
    }

    if (Ember.isArray(obj) || Ember.isString(obj)) {
        return obj.length === 0;
    }

    for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            return false;
        }
    }

    return true;
};

Ember.startsWith = function(str, starts) {
    return str.slice(0, starts.length) === starts;
};

Ember.endsWith = function(str, ends) {
    return str.slice(str.length - ends.length) === ends;
};

Eurekapp = (function(clientConfig){
    'use strict';

    var App = Ember.Application.create({
        // LOG_STACKTRACE_ON_DEPRECATION : true,
        // LOG_BINDINGS                  : true,
        // LOG_TRANSITIONS               : true,
        // LOG_TRANSITIONS_INTERNAL      : true,
        // LOG_VIEW_LOOKUPS              : true,
        // LOG_ACTIVE_GENERATION         : true,

        ready: function() {
            Ember.$('title').text(this.get('config').name);
            console.log(this.get('config').name, 'is ready !');
        },

        getModelMeta: function(modelType) {
            var modelMeta = App.ModelMeta.create(this.config.schemas[modelType]);
            modelMeta.set('type', modelType);
            return modelMeta;
        }
    });

    App.utils = {
        convertValue: function(fieldSchema, fieldName, value) {
            // convert string values from input into the field's type
            // this information is taken from the field's schema
            var fieldType = fieldSchema.type;
            var _this = this;
            if (fieldSchema.multi && Ember.isArray(value)) {
                var values = [];
                value.forEach(function(item) {
                    values.push(_this.convertValue(fieldSchema,fieldName, item));
                });
                return values;
            }
            if (fieldType === 'float') {
                value = parseFloat(value);
                var precision = fieldSchema.precision;
                if (precision) {
                    value = parseFloat(value.toPrecision(precision));
                }
            } else if (fieldType === 'integer') {
                value = parseInt(value, 10);
            } else if (['date', 'datetime'].indexOf(fieldType) > -1) {
                value = new Date(value);
            }
            return value;
        }
    };

    App.Router.map(function() {
        this.resource('generic_model', { path: '/' }, function() {
            this.route('display', {path: '/:modelType/:id'});
            this.route('edit', {path: '/:modelType/:id/edit'});
            this.route('new', {path: '/:modelType/new'});
            this.route('list', {path: '/:modelType'});
        });
    });

    App.ApplicationRoute = Ember.Route.extend({
        model: function() {
            return App.config;
        }
    });

    App.ApplicationController = Ember.ObjectController.extend({
        applicationName: Ember.computed.alias('name')
    });


    App.ApplicationMenuComponent = Ember.Component.extend({
        model: null,

        modelNames: function() {
            return Ember.keys(this.get('model').schemas).map(function(modelName){
                return {
                    classified: modelName.camelize().capitalize(),
                    decamelized: modelName.underscore(),
                    dasherized: modelName.dasherize()
                };
            });
        }.property('model.schemas')
    });


    /* the RouteTemplateMixin allow all objects which implement the mixin to
     * use a generic template if a model doesn't specified one.
     */
    App.RouteTemplateMixin = Ember.Mixin.create({
        genericTemplateName: null,
        genericControllerName: null,

        setupController: function(controller, model) {
            controller.set('model', model);
        },

        renderTemplate: function(controller, model) {
            // template
            var template = this.get('genericTemplateName');
            var type = model.get('type');
            var customTemplateName = template.replace('<generic_model>', type.underscore());
            if (Ember.TEMPLATES[customTemplateName]) {
                template = customTemplateName;
            } else {
                template = template.replace('<generic_model>', 'generic_model');
            }

            // // controller
            var controllerName = this.get('genericControllerName');
            if (controllerName) {
                var customControllerName = controllerName.replace('<generic_model>', type);
                if (App[customControllerName+'Controller']) {
                    controller = this.controllerFor(customControllerName.underscore());
                    controller.set('model', model);
                }
            }
            this.render(template, {controller: controller});
        }
    });


    App.GenericModelListRoute = Ember.Route.extend(App.RouteTemplateMixin, {
        genericTemplateName: '<generic_model>/list',
        genericControllerName: '<generic_model>List',

        model: function(params) {
            return this.get('db')[params.modelType.camelize().capitalize()].find();
        }
    });


    App.GenericModelDisplayRoute = Ember.Route.extend(App.RouteTemplateMixin, {
        genericTemplateName: '<generic_model>/display',
        genericControllerName: '<generic_model>Display',

        model: function(params) {
            var _type = params.modelType.camelize().capitalize();
            var _id = params.id;
            return this.get('db')[_type].first({_id: _id, _type: _type});
        }
    });

    App.GenericModelNewRoute = Ember.Route.extend(App.RouteTemplateMixin, {
        genericTemplateName: '<generic_model>/new',
        genericControllerName: '<generic_model>New',

        model: function(params) {
            var _type = params.modelType.camelize().capitalize();
            return this.get('db')[_type].get('model').create({content: {}});
        }
    });

    App.GenericModelEditRoute = Ember.Route.extend(App.RouteTemplateMixin, {
        genericTemplateName: '<generic_model>/edit',
        genericControllerName: '<generic_model>Edit',

        model: function(params) {
            var _type = params.modelType.camelize().capitalize();
            var _id = params.id;
            return this.get('db')[_type].first({_id: _id, _type: _type});
        }
    });

    /***** Controllers ******/

    /* The controllers handles the actions and all variables not needed beetween
     * two sessions.
     */

    /* This mixin is used to make the controller aware of the different actions available */
    App.ActionControllerMixin = Ember.Mixin.create(Ember.TargetActionSupport, {
        modelActions: function() {
            var actions = this.get('model.__meta__.actions');
            if (actions === undefined) {
                actions = [];
            }
            return actions.map(function(action){
                return {
                    name: action.name,
                    label: action.label || action.name,
                    cssClass: 'eureka-'+action.name.dasherize()+'-action'
                };
            });
        }.property('model.__meta__.actions'),

        transitionToPage: function(page, type, _id) {
            var args = Array.prototype.slice.call(arguments, 2);
            // page = args.shift();
            // type = args.shift();
            var routeName;

            var modelType = this.get('model.type');
            type = modelType.underscore();
            var customRouteName = modelType+page.camelize().capitalize()+'Route';

            if (App[customRouteName]) {
                routeName = modelType.underscore()+'.'+page;
                args.unshift(routeName);
                Ember.Controller.prototype.transitionToRoute.apply(this, args);
            } else {
                routeName = 'generic_model.'+page;
                args.unshift(type);
                args.unshift(routeName);
                Ember.Controller.prototype.transitionToRoute.apply(this, args);
            }
        },

        actions: {
            trigger: function(actionName) {
               this.triggerAction({
                    action:actionName,
                    target: this
                });
            }
        }
    });

    /* List the documents */
    App.GenericModelListController = Ember.ArrayController.extend({
        actions: {
            searchModel: function(query) {
                var modelType = this.get('model').get('type');
                var _this = this;
                App.db[modelType].find(query).then(function(model) {
                    _this.set('model', model);
                }, function(e) {
                    alertify.error(e.error);
                });
            }
        }
    });


    /* Display a document */
    App.GenericModelDisplayController = Ember.ObjectController.extend(App.ActionControllerMixin, {
        actions: {
            "delete": function() {
                var _this = this;
                var model = this.get('model');
                var type = model.get('__type__').underscore();
                model.delete().then(function(data) {
                    _this.transitionToPage('list', type);
                }, function(jqXHR) {
                    console.log('error !!!', jqXHR);
                    alertify.error(jqXHR);
                });
            },
            edit: function() {
                var model = this.get('model');
                var type = model.get('__type__');
                var _id = model.get('_id');
                this.transitionToPage('edit', type, _id);
            }
        }
    });


    /* Display a form to create a new document */
    App.GenericModelNewController = Ember.ObjectController.extend(App.ActionControllerMixin, {
        actions: {
            save: function() {
                var _this = this;
                this.get('model').save().then(function(model) {
                    var type = model.get('type').underscore();
                    _this.transitionToPage('list', type);
                }, function(err){
                    alertify.error(err);
                    return console.log('err', err);
                });
            }
        }
    });

    /* Display a form to edit an existing document */
    App.GenericModelEditController = Ember.ObjectController.extend(App.ActionControllerMixin, {
        actions: {
            save: function() {
                var _this = this;
                this.get('model').save().then(function(model) {
                    var type = model.get('type').underscore();
                    var _id = model.get('_id');
                    _this.transitionToPage('display', type, _id);
                }, function(err){
                    alertify.error(err);
                    return console.log('err', err);
                });
            }
        }
    });

    // Ember.TEMPLATES = require('./templates');

    /**** Models *****/


    /* ModelMeta
     * this object contains all the information about the model written in schemas.js
     */
    App.ModelMeta = Ember.Object.extend({
        type: null,

        dasherizedType: function() {
            return this.get('type').dasherize();
        }.property('type').readOnly(),

        decamelizedType: function() {
            return this.get('type').underscore();
        }.property('type').readOnly(),

        searchFieldName: function() {
            var lookupFieldName = this.get('search.field');
            if (!lookupFieldName) {
                if (this.get('__title__') && this.get('__title__').bindTo) {
                    lookupFieldName = this.get('__title__').bindTo;
                }
                else if (this.get('properties.title')) {
                    lookupFieldName = 'title';
                } else {
                    // TODO check this when starting server
                    alertify.log('WARNING ! no search field found for '+this.get('type')+'. Please add one in config ');
                }
            }
            return lookupFieldName;
        }.property('search.field', '__title__', 'properties.title'),

        searchPlaceholder: function() {
            var placeholder = this.get('search.placeholder');
            if (!placeholder) {
                placeholder = "search a "+this.get('title')+"...";
            }
            return placeholder;
        }.property('search.placeholder', 'title'),

        searchAdvancedPlaceholder: function() {
            var placeholder = this.get('search.advancedPlaceholder');
            if (!placeholder) {
                placeholder = "prop1 = value && prop2 > 30";
            }
            return placeholder;
        }.property('search.placeholder', 'title'),

        title: function() {
            return this.get('content.title') || this.get('type').underscore().replace('_', ' ');
        }.property('content.title'),

        properties: function() {
            return this.get('schema');
        }.property('schema')
    });

    /* Model
     * the model instance
     */
    App.Model = Ember.ObjectProxy.extend({

        init: function() {
            this._super();

            /*
             * Process the model content in order to
             * wrap relations with Models
             */
            var content = this.get('content');
            for (var key in content) {

                var value = content[key];
                var fieldSchema = this.get('__meta__.properties')[key];
                if (!fieldSchema) {
                    continue;
                }
                var relationType = fieldSchema.type;

                // if the field is a relation
                if (!!App.getModelMeta(relationType).get('properties')) {

                    if (fieldSchema.multi) {

                        var values = [];

                        value.forEach(function(item) {
                            var rel = App.db[relationType].get('model').create({
                                content: item
                            });
                            values.push(rel);
                        });

                        this.set('content.'+key, values);
                    }
                    else {
                        var rel = App.db[relationType].get('model').create({
                            content: value
                        });
                        this.set('content.'+key, rel);
                    }
                } else {
                    value = App.utils.convertValue(fieldSchema, key, value);
                    this.set('content.'+key, value);
                }
            }

            this.__buildDescriptors();
        },


        /* incremented each time the content is changed in
         * one of its field */
        _contentChanged: 0,
        content: null,

        __type__: null,


        __meta__: function() {
            return App.getModelMeta(this.get('__type__'));
        }.property('__type__'),


        /* build the descriptors (__title__, __description__, __thumb__)
        * Descriptors are used to represent a model in generic templates.
        * It is also used as an helper.
        * There are currently 3 descriptors:
        *   * `__title__`
        *   * `__description__`
        *   * `__thumb__`
        *
        * To use them add into the model config the descriptors:
        * {
        *      __title__: {template: "The {{_id}} !!"},
        *      __description__: {bindTo: 'remark'},
        *      __thumb__: 'http://placehold.it/40x40'
        * }
        */
        __buildDescriptors: function() {
            var _this = this;
            ['title', 'description', 'thumb'].forEach(function(item){
                var config = _this.get('__meta__')['__'+item+'__'];

                // precompile descriptor's templates if needed
                if (config && config.template) {
                    var compiledTemplate = Handlebars.compile(config.template);
                    _this.set('_'+item+'CompiledTemplate', compiledTemplate);
                }

                // define the computed properties
                Ember.defineProperty(_this, '__'+item+'__', Ember.computed(function(key) {
                    if (config) {
                        if (config.template) {
                            return this.get('_'+item+'CompiledTemplate')(this.get('content'));
                        }

                        if (config.bindTo) {
                            return this.get(config.bindTo);
                        }
                        return config;
                    }
                    if (this.get('content.'+item)) {
                        return this.get('content.'+item);
                    }
                    if (item === 'title') {
                        return this.get('_id');
                    }
                    return '';
                }).property('_contentChanged'));

            });

        },

        /* _toJSONObject
         * Convert the model into a pojo ready to be serialized as JSON
         */
        _toJSONObject: function() {
            var pojo = {};
            var content = this.get('content');
            for (var fieldName in content) {
                var isRelation = App.db[this.get('type')].isRelation(fieldName);
                if (content[fieldName] && isRelation) {
                    var modelSchema = this.get('__meta__.properties');
                    var relations = content[fieldName];
                    if (!Ember.isArray(relations)) {
                        relations = [relations];
                    }

                    var rels = [];
                    relations.forEach(function(relation) {
                        if (relation.get('_ref')) {
                            rels.push({
                                _id: relation.get('_id'),
                                _type: relation.get('type')
                            });
                        } else {
                            rels.push(relation._toJSONObject());
                        }
                    });


                    if (rels.length) {
                        if (modelSchema[fieldName].multi) {
                            pojo[fieldName] = rels;
                        } else {
                            pojo[fieldName] = rels[0];
                        }
                    } else {
                        pojo[fieldName] = null;
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

        _getPendingPromises: function() {
            var pendingPromises = Ember.A();
            var content = this.get('content');
            for (var fieldName in content) {

                var fieldSchema = this.get('__meta__.properties')[fieldName];
                if (!fieldSchema) {
                    continue;
                }

                // save relations if changed or add to pojo if the relation is new
                var isRelation = App.db[this.get('type')].isRelation(fieldName);
                if (isRelation) {
                    var relations = content[fieldName];
                    if (!relations) {
                        continue;
                    }

                    if (!Ember.isArray(relations)) {
                        relations = [relations];
                    }

                    relations.forEach(function(relation){
                        pendingPromises.addObjects(relation._getPendingPromises());
                    });
                }
            }

            return pendingPromises;
        },

        _saveModel: function() {
            // this._updateContent();
            var type = this.get('__type__');
            var endpoint = App.config.apiURI+'/'+type.underscore();
            var postData = {payload: this._toJSON()};
            return new Ember.RSVP.Promise(function(resolve, reject) {
                Ember.$.post(endpoint, postData, function(data) {
                    return resolve(App.db[type].get('model').create({
                        content: data.object
                    }));
                }).fail(function(jqXHR) {
                    var error = jqXHR.responseText;
                    if (jqXHR.responseText.error !== undefined) {
                        error = jqXHR.responseText.error;
                    }
                    return reject(error);
                });
            });
        },

        save: function() {
            var _this = this;
            var promises = this._getPendingPromises();
            return Ember.RSVP.Promise.all(promises).then(function(relations){
                return _this._saveModel();
            });
        },

        "delete": function() {
            var type = this.get('__type__');
            var url = App.config.apiURI+'/'+type.underscore()+'/'+this.get('_id');
            return new Ember.RSVP.Promise(function(resolve, reject) {
                $.ajax({
                    url: url,
                    type: 'DELETE',
                    success: function(data) {
                        if (data.status === 'ok') {
                            return resolve(data);
                        } else {
                            return reject(data.error);
                        }
                    },
                    error: function(jqXHR) {
                        return reject(jqXHR);
                    }
                });
            });
        },

        fieldsList: function() {
            var fields = Ember.A();
            var modelSchema = this.get('__meta__.properties');
            for (var fieldName in modelSchema) {
                var fieldSchema = modelSchema[fieldName];
                var field;
                if (fieldSchema.multi) {
                    field = App.ModelMultiField.create({
                        name: fieldName,
                        model: this,
                        schema: Ember.Object.create(fieldSchema)
                    });
                } else {
                    field = App.ModelField.create({
                        name: fieldName,
                        model: this,
                        schema: Ember.Object.create(fieldSchema),
                    });
                }

                // filling field values
                var content = null;
                var value = this.get('content.'+fieldName);

                if (value === undefined) {
                    if (field.get('isMulti') || field.get('isI18n')) {
                        value = Ember.A();
                    } else {
                        value = null;
                    }
                }
                else {
                    var values = Ember.A();
                    if (field.get('isMulti')) {
                        if(!Ember.isArray(value)) {
                            value = [value];
                        }
                        value.forEach(function(val){
                            values.pushObject(Ember.Object.create({value: val}));
                        });

                        if (values.length) {
                            value = values;
                        } else {
                            value = null;
                        }
                    } else if (field.get('isI18n')) {
                        for (var lang in value) {
                            var _value = value[lang];
                            values.pushObject(Ember.Object.create({
                                value: _value,
                                lang: lang
                            }));
                        }
                        if (values.length) {
                            value = values;
                        } else {
                            value = null;
                        }
                    }
                }
                field.set('content', value);

                // var watchContentPath = 'content';
                // if (field.get('isMulti')) {
                //     watchContentPath = 'content.@each.value';
                // } else if (field.get('isI18n')) {
                //     Ember.addObserver(field, 'content.@each.lang', field, '_triggerModelChanged');
                //     watchContentPath = 'content.@each.value';
                // }
                // Ember.addObserver(field, watchContentPath, field, '_triggerModelChanged');

                fields.push(field);
            }
            return fields;
        }.property('__meta__.properties').readOnly(),


        _fields: function() {
            var fields = Ember.Object.create();
            this.get('fieldsList').forEach(function(field){
                fields.set(field.get('name'), field);
            });
            return fields;
        }.property('fieldsList').readOnly(),


        _updateContent: function() {
            var fields = this.get('fieldsList');
            var _this = this;
            fields.forEach(function(field){
                var value = null;
                var content = field.get('content');
                if (field.get('isMulti')) {
                    value = [];
                    content.forEach(function(item){
                        if (item.get('value') !== null) {
                            value.push(item.get('value'));
                        }
                    });
                    if (value.length === 0) {
                       value = null;
                    }
                } else if (field.get('isI18n')){
                    value = {};
                    content.forEach(function(item){
                        if (item.get('value') !== null && item.get('lang') !== null) {
                            value[item.get('lang')] = item.get('value');
                        }
                    });
                    if (Ember.isEmpty(value)) {
                       value = null;
                    }
                } else {
                    if (['', null, undefined].indexOf(content) === -1) {
                        value = content;
                        value = App.utils.convertValue(field.get('schema'), field.get('name'), value);
                    }
                }

                _this.set('content.'+field.get('name'), value);
            });
        }.observes('_contentChanged'),

        // _observeFields: function() {
        //     Ember.run.debounce(this, this._updateContent, 300, true);
        // }.observes('_contentChanged'),

        /**** properties ****/

        type: function() {
            return this.get('content._type') || this.get('__type__');
        }.property('content._type', '__type__').readOnly(),

        // dasherized_type: function() {
        //     return this.get('type').dasherize();
        // }.property('type').readOnly(),

        // underscored_type: function() {
        //     return this.get('type').underscore();
        // }.property('type').readOnly(),

        unknownProperty: function(key) {
            /*
             * If a property name ends with 'Field', then the ModelField
             * object is return. This is useful if we're looking for the
             * field schema and model relations...
             */
            if (Ember.endsWith(key, "Field")){
                var fieldName = key.slice(0, key.length - "Field".length);
                var field = this.get('_fields').get(fieldName);
                if (field) {
                    return field;
                }
            }
            return this.get('content.'+key);
        }

    });

    /* ResultSet
     * Contains an array of models returned by a promise
     */
    App.ResultSet = Ember.ArrayProxy.extend({
        type: null,

        __meta__: function() {
            return App.getModelMeta(this.get('type'));
        }.property('type'),

        // dasherized_type: function() {
        //     return this.get('type').dasherize();
        // }.property('type').readOnly(),

        // underscored_type: function() {
        //     return this.get('type').underscore();
        // }.property('type').readOnly(),

        schema: function() {
            return this.get('__meta__.schema');
        }.property('__meta__.schema'),

        fields: function() {
            var _fields = Ember.A();
            for (var fieldName in this.get('schema')) {
                _fields.push({
                    name: fieldName,
                    structure: this.get('schema')[fieldName]
                });
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
        model: null,

        __meta__: function() {
            return App.getModelMeta(this.get('type'));
        }.property('type'),

        properties: function() {
            return this.get('__meta__').schema;
        }.property('__meta__.schema'),

        endpoint: function() {
            return App.config.apiURI+'/'+this.get('type').underscore();
        }.property('App.config.apiURI', 'type'),

        isRelation: function(fieldName) {
            var field = this.get('properties')[fieldName];
            if (field) {
                return !!App.db[field.type];
            }
            return false;
        },

        isMulti: function(fieldName) {
            return !!this.get('properties')[fieldName].multi;
        },

        isI18n: function(fieldName) {
            return !!this.get('properties')[fieldName].i18n;
        },

        getFieldType: function(fieldName) {
            var field = this.get('properties')[fieldName];
            if (field) {
                return field.type;
            }
        },

        find: function(query) {
            if (!query) {
                query = {};
            }
            var that = this;
            var modelType = this.get('type');

            // build query from model's meta
            var meta = this.get('__meta__');
            if (query._sortBy === undefined && meta.search && meta.search.sortBy) {
                query._sortBy = meta.search.sortBy;
            }

            // query._populate = false;
            return new Ember.RSVP.Promise(function(resolve, reject) {
                Ember.$.getJSON(that.get('endpoint'), query).done(function(data){
                    var results = Ember.A();
                    data.results.forEach(function(item){
                        var obj = that.get('model').create({
                            content: item,
                            __type__: modelType
                        });
                        results.push(obj);
                    });
                    var resultSet = App.ResultSet.create({
                        type: modelType,
                        content: results
                    });
                    return resolve(resultSet);
                }).fail(function(e) {
                    return reject(JSON.parse(e.responseText));
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
                    }
                    // build the model
                    obj = that.get('model').create({content: content});
                    return resolve(obj);
                });
            });
        }
    });


    App.ModelField = Ember.Object.extend({
        model: null,
        name: null,
        schema: null,
        content: null,

        isSafeString: function() {
            return !!this.get('schema').safeString;
        }.property('schema.safeString'),

        isRelation: function() {
            return !!App.db[this.get('schema').get('type')];
        }.property('schema.type'),

        isMulti: function() {
            return !!this.get('schema').multi;
        }.property('schema.multi'),

        isI18n: function() {
            return !!this.get('schema').i18n;
        }.property('schema.i18n'),

        relationModel: function() {
            if (this.get('isRelation')) {
                return App.db[this.get('schema').get('type')].get('model');
            }
        }.property('isRelation'),

        /* _triggerModelChanged
         * Tells the model that its content has changed.
         *
         * This method is observed by the field (this) and its observer
         * is registered in `App.Model._fields` as the observer path
         * changes if the field is a multi-field or not:
         *
         * if isMulti: the observer path is `content.@each.value`
         * else: the observer path is `content`
         */
        _triggerModelChanged: function() {
            this.get('model').incrementProperty('_contentChanged');
        },

        // // Manually removing the observers added in  `Model._fields`.
        // willDestroy: function () {
            // var watchContentPath = 'content';
            // if (this.get('isMulti')) {
            //     watchContentPath = 'content.@each.value';
            // } else if (this.get('isI18n')) {
            //     watchContentPath = 'content.@each.value';
            // }
            // Ember.removeObserver(this, watchContentPath, this, '_triggerModelChanged');
        // }
    });

    App.ModelMultiField = App.ModelField.extend({

        init: function() {
            this._super();
            this.set('content', Ember.A());
        },

        contentLength: function() {
            return this.get('content').length;
        }.property('content.@each.value')
    });

    /*** Components ****/

    /* TemplateMixin
     * If a components extend this mixin, its template can be overloaded
     *
     * For example, if `genericTemplateName` is `components/<generic>-model-form`
     * and the `templateType` is 'blog_post', then the existance of the template
     * `components/blog_post-model-form` will be check in Ember.TEMPLATES. If true,
     * the corresponding template is displayed, else, the generic template will be used.
     *
     *
     * TODO: allow fqfn in `templateType`: `model::field-...`. Example:
     *  `blog_post::remark-field-form` will be displayed only on the `remark` field
     *  of a BlogPost model
     */
    App.TemplateMixin = Ember.Mixin.create({
        genericTemplateName: null,
        modelType: null,
        fieldName: null,

        layoutName: function() {
            var genericTemplateName = this.get('genericTemplateName');

            var genericModelType = 'generic_model';
            var genericFieldName = 'generic_field';

            var modelType = this.get('modelType');
            if (modelType) {
                modelType = modelType.underscore();
            } else {
                modelType = genericModelType;
            }

            var fieldName = this.get('fieldName') || genericFieldName;

            // check with custom model and custom field
            var customTemplateName = genericTemplateName
              .replace('<generic_model>', modelType)
              .replace('<generic_field>', fieldName);
            var templateName = Ember.TEMPLATES[customTemplateName];

            if (!Ember.TEMPLATES[customTemplateName]) {
                // check with generic model and custom field
                customTemplateName = genericTemplateName
                  .replace('<generic_model>', genericModelType)
                  .replace('<generic_field>', fieldName);
            }

            if (!Ember.TEMPLATES[customTemplateName]) {
                // else, go with full generic
                customTemplateName = genericTemplateName
                  .replace('<generic_model>', genericModelType)
                  .replace('<generic_field>', genericFieldName);
            }

            return customTemplateName;
        }.property('modelType', 'fieldName').volatile(),

        rerenderLayout: function() {
            // console.log(this.get('layoutName'));
            this.set('layout', Ember.TEMPLATES[this.get('layoutName')]);
            this.rerender();
        }.observes('templateType')
    });

    /** display components **/

    App.ModelDisplayComponent = Ember.Component.extend(App.TemplateMixin, {
        model: null,
        modelType: Ember.computed.alias('model.type'),
        genericTemplateName: 'components/<generic_model>-display',

        fields: function() {
            var fields = Ember.A();
            this.get('model').get('fieldsList').forEach(function(field){
                if (field.get('isMulti') || field.get('isI18n')) {
                    if (field.get('content').length) {
                        fields.pushObject(field);
                    }
                } else {
                    if (field.get('content') !== null) {
                        fields.pushObject(field);
                    }
                }
            });
            return fields;
        }.property('model.fieldsList')
    });


    App.ModelFieldDisplayComponent = Ember.Component.extend(App.TemplateMixin, {
        field: null,
        model: null,
        fieldName: Ember.computed.alias('field.name'),
        modelType: Ember.computed.alias('field.model.type'),
        genericTemplateName: 'components/<generic_model>-<generic_field>-display'
    });


    /*** form components ***/

    App.ModelFormComponent = Ember.Component.extend(App.TemplateMixin, {
        model: null,
        modelType: Ember.computed.alias('model.type'),
        genericTemplateName: 'components/<generic_model>-form',
        isRelation: false,

        fields: function() {
            var model = this.get('model');
            if (!model) {
                return Ember.A();
            }
            return model.get('fieldsList');
        }.property('model.fieldsList'),
    });


    App.ModelFieldFormComponent = Ember.Component.extend(App.TemplateMixin, {
        genericTemplateName: 'components/<generic_model>-<generic_field>-form',
        field: null,
        fieldName: Ember.computed.alias('field.name'),
        modelType: Ember.computed.alias('field.model.type'),

        // get the name of the template from the field name
        templateType: function() {
            var field = this.get('field');
            if (field) {
                return field.get('name');
            }
        }.property('field.name'),

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
                fieldContent.set('isEditable', true);

                var field = this.get('field');
                if (field.get('isMulti')) {
                    field.get('content').removeObject(fieldContent);
                    field.set('isEditable', false);
                }
            },
            removeRelation: function(fieldContent) {
                var field = this.get('field');
                if (field.get('isMulti')) {
                    field.get('content').removeObject(fieldContent);
                } else {
                    field.set('isEditable', false);
                    field.set('content', null);
                }
            },
            doneRelation: function(fieldContent) {
                fieldContent.set('isEditable', false);

                var field = this.get('field');
                if (field.get('isMulti')) {
                    field.set('isEditable', false);
                }
            },
            add: function() {
                var item, value;
                var field = this.get('field');
                if (Ember.isEmpty(field.get('content'))) {
                    if (field.get('isMulti')) {
                        if (field.get('isRelation')) {
                            value = field.get('relationModel').create({content: {}});
                        } else {
                            value = null;
                        }
                        item = Ember.Object.create({value: value, isEditable: true});
                        field.get('content').pushObject(item);
                    }
                    else {
                        if (field.get('isRelation')) {
                            field.set('content', field.get('relationModel').create({
                                content: {}
                            }));
                            field.set('isEditable', true);
                        } else if (field.get('isI18n')) {
                            item = Ember.Object.create({value: null, lang: null});
                            field.get('content').pushObject(item);
                        }
                    }
                } else {

                    if (!field.get('isMulti') && !field.get('isI18n')) {
                        field.set('isEditable', false);
                    } else if (!field.get('isRelation')) {
                        if (field.get('isI18n')) {
                            item = Ember.Object.create({value: null, lang: null});
                        }
                        else {
                            item = Ember.Object.create({value: null, isEditable: true});
                        }
                        field.get('content').pushObject(item);
                    }
                }
            }
        }

    });


    App.DynamicInputComponent = Ember.Component.extend({
        field: null,
        value: null,

        fieldName: function() {
            return this.get('field.name');
        }.property('field.name'),

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

        isDateTime: function() {
            return this.get('type') === 'datetime';
        }.property('type'),

        isTime: function() {
            return this.get('type') === 'time';
        }.property('type'),

        isDate: function() {
            return this.get('type') === 'date';
        }.property('type'),

        change: function() {
            // update the model content when the user change the input
            this.get('field')._triggerModelChanged();
        }

    });

    App.RelationAutoSuggestComponent = Ember.TextField.extend({
        classNames: "typeahead",
        searchFieldName: null,
        displayFieldName: null,
        value: null,
        field: null,

        didInsertElement: function() {
            this._super();
            var source = this.getSource();

            this.typeahead = this.$().typeahead({
                hint: false,
                minLength: 1
            }, {
                source: source.ttAdapter()
            });

            var _this = this;
            this.typeahead.on('typeahead:selected', function(event, item){
                _this.valueSelected(item);
            });
        },

        focusOut: function() {
            this.$().typeahead('val', '');
            this.set('value', null);
        },

        /*
         * valueSelected
         * fill the field content with the selected value.
         * This method is fired when an item is selected into typeahead
         */
        valueSelected: function(item) {
            var field = this.get('field');
            if (item.object) {
                var obj = item.object;
                if (field.get('isMulti')) {
                    var wrappedObj = Ember.Object.create({value: obj, isEditable: false});
                    field.get('content').pushObject(wrappedObj);
                } else {
                    field.set('content', obj);
                }
            } else { // No object is selected, we pass a null value so the form can be created
                if (field.get('isMulti')) {
                    var content = field.get('content');
                    var emptyItem = field.get('relationModel').create({
                        content: {}
                    });
                    content.pushObject(Ember.Object.create({value: emptyItem, isEditable: true}));
                    field.set('isEditable', true);
                    field.set('content', content);
                } else {
                    field.set('content', null);
                }
            }
            this.set('value', null);
            this.$().typeahead('val', '');
            this.sendAction('onSelected');
            field._triggerModelChanged();
        },

        willDestroyElement: function() {},

        getSource: function() {

            var relationType = this.get('field.schema.type');
            var searchFieldName = this.get('searchFieldName');
            if (!searchFieldName) {
                searchFieldName = App.getModelMeta(relationType).get('searchFieldName');
            }
            var displayFieldName = this.get('displayFieldName') || '__title__';
            var field = this.get('field');

            var source = new Bloodhound({
                limit: 10,
                datumTokenizer: function (d) {
                    return Bloodhound.tokenizers.whitespace(d.value);
                },
                queryTokenizer: Bloodhound.tokenizers.whitespace,
                remote: {
                    url: App.config.apiURI+'/'+relationType.underscore()+'?'+searchFieldName+'[$iregex]=^%QUERY&_limit=9',
                    filter: function (data) {
                        var results = [];
                        var object;
                        data.results.forEach(function(item) {
                            object = field.get('relationModel').create({
                                content: item
                            });
                            var value = object.get(displayFieldName);
                            value = value.string || value; // handle Handlebars' SafeString if needed
                            results.push({
                                object: object,
                                value: value
                            });
                        });
                        results = results.sortBy('value');
                        results.push({value: '--create new '+relationType+'--'});
                        return results;
                    }
                }
            });
            source.initialize();
            return source;
        }
    });

    /*** query components **/

    App.SimpleQueryComponent = Ember.TextField.extend({
        model: null,
        autocomplete: 'off',

        placeholder: function() {
            var modelType = this.get('model').get('type');
            return App.getModelMeta(modelType).get('searchPlaceholder');
        }.property('model.type'),

        buildQuery: function(value) {
            var jsonQuery = {};
            var modelType = this.get('model').get('type');
            var searchFieldName = App.getModelMeta(modelType).get('searchFieldName');
            jsonQuery[searchFieldName] = {'$iregex': '^'+value};
            return jsonQuery;
        },

        valueObserver: function() {
            if (this.get('value')) {
                Ember.run.debounce(this, this.sendQuery, 200);
            }
        }.observes('value'),

        sendQuery: function() {
            var query = this.buildQuery(this.get('value'));
            this.sendAction('action', query);
        }

    });


    App.AdvancedQueryComponent = Ember.TextArea.extend({
        model: null,
        onEvent: 'keyPress',

        placeholder: function() {
            var modelType = this.get('model').get('type');
            return App.getModelMeta(modelType).get('searchAdvancedPlaceholder');
        }.property('model.type'),

        keyPress: function(e) {
            if (e.keyCode === 13) {
                this.sendAction('action', this.parseQuery(this.get('value')));
                e.preventDefault();
                e.stopPropagation();
            }
        },

        parseQuery: function(query) {
            var jsonQuery = {};
            query = query.trim();
            query.split('&&').forEach(function(statement) {
                var splited;
                if (statement.indexOf('>') > -1) {
                    splited = statement.split('>');
                    jsonQuery[splited[0].trim()] = {'$gt': splited[1].trim()};
                } else if (statement.indexOf('<') > -1) {
                    splited = statement.split('<');
                    jsonQuery[splited[0].trim()] = {'$lt': splited[1].trim()};
                } else if (statement.indexOf('!=') > -1) {
                    splited = statement.split('!=');
                    jsonQuery[splited[0].trim()] = {'$ne': splited[1].trim()};
                } else if (statement.indexOf('=') > -1) {
                    splited = statement.split('=');
                    jsonQuery[splited[0].trim()] = splited[1].trim();
                }
            });
            return jsonQuery;
        },

        didInsertElement: function() {
            this.$().focus();
        }
    });

    App.CroppedThumbComponent = Ember.Component.extend({
        tagName: 'img',
        model: null,
        classNames: 'eureka-cropped-thumb',
        attributeBindings: ['src', 'width', 'height'],
        width: 150,
        height: 150,

        src: function() {
            return this.get('model.__thumb__');
        }.property('model.__thumb__'),

        didInsertElement: function() {
            this.$().fakecrop({wrapperWidth: this.get('width'), wrapperHeight: this.get('height')});
        }
    });


    /** Vendors components ***/
    App.DatePickerComponent = Ember.TextField.extend({
        classNames: ['datepicker'],
        value: null,
        attributeBindings: ['dataValue:data-value'],
        placeholder: 'select a date...',

        dataValue: function() {
            var date = this.get('value');
            if (date) {
                return date;
            }
            return '';
        }.property('value'),

        didInsertElement: function() {
            var _this = this;
            this.$().pickadate({
                onSet: function(context) {
                    var epoc = null;
                    if (context.select) {
                        if (context.select.pick) {
                            epoc = context.select.pick;
                        } else if (context.select) {
                            epoc = context.select;
                        }
                    }
                    if (epoc) {
                       _this.set('value', new Date(epoc));
                    }
                }
            });
            this.$().removeAttr('readonly');
        }
    });

    /* model-to helper
     * This helper is used as a replacement to the link-to helper.
     * The model-to helper will check if the model has a specific route.
     * If so, the correponding url is used. This helper also add some css classes
     * useful to idenitify the link that are related to a model.
     * At last, the model-to helper can be used as a block component. The value
     * in the block will be used as the link title
     */
    Ember.Handlebars.registerHelper('model-to', function(action, modelTypeName, modelId, options) {
        var model = Ember.Handlebars.get(this, modelTypeName, options);
        var modelType;
        if (typeof(model) === 'object') {
            modelType = model.get('type');
        } else {
            modelType = model;
            model = null;
        }
        if (options === undefined) {
            options = modelId;
            modelId = null;
        }

        var args = [];

        options.contexts = [];
        options.types = [];

        // classNames
        // bootstraping hash and hashContext
        if (!options.hash) {
            options.hash = {};
        }
        if (!options.hashContexts){
            options.hashContexts = {};
        }
        options.hashContexts.classNames = this;

        if (!options.hash.classNames) {
            options.hash.classNames = '';
        }
        options.hash.classNames += " model-to-" + action;

        if (modelType) {
            options.hash.classBinding += ' '+modelTypeName+'.__meta__.dasherizedType';
        }

        // check the route to use (default to generic_model.<action>)
        var routeName = 'generic_model.' + action;
        var capitalized_action = action.camelize().capitalize();
        if(App[modelType + capitalized_action + 'Route']) {
            routeName = modelType.underscore() + '.' + action;
        }

        args.push(routeName);
        options.types.push('STRING');
        options.contexts.push(this);

        if (model) {
            args.push(modelTypeName+'.__meta__.decamelizedType');
            options.types.push('ID');
            options.contexts.push(this);
        } else {
            args.push(modelTypeName);
            options.types.push('ID');
            options.contexts.push(this);
        }

        if (modelId) {
            args.push(modelId);
            options.types.push('ID');
            options.contexts.push(this);
        }

        args.push(options);

        return Ember.Handlebars.helpers['link-to'].apply(this, args);
    });


    App.ApplicationConfig = Ember.Object.extend({
        // application config used in App.config
        // add here some custom methods
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
                        type: _type
                    });
                    var Model;
                    if (App[_type+'Model']) {
                        Model = App[_type+'Model'];
                    } else {
                        Model = App.Model;
                    }
                    Model = Model.extend({__type__: _type});
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

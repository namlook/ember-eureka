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

    App.utils = {
        convertValue: function(fieldSchema, fieldName, value) {
            // convert string values from input into the field's type
            // this information is taken from the field's schema
            var fieldType = fieldSchema.type;
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
                _modelNames.push({
                    classified: modelName.camelize().capitalize(),
                    underscored: modelName.underscore()
                });
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
        applicationName: Ember.computed.alias('name')
    });


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
            // console.log(template, type, controller, model);
            var customTemplateName = template.replace('<type>', type.underscore());
            if (Ember.TEMPLATES[customTemplateName]) {
                template = customTemplateName;
            } else {
                template = template.replace('<type>', 'type');
            }

            // // controller
            // var controllerName = this.get('genericControllerName');
            // if (controllerName) {
            //     var customControllerName = controllerName.replace('<type>', type);
            //     if (App[customControllerName]) {
            //         controller = this.controllerFor(customControllerName);
            //         controller.set('model', model);
            //     }
            // }
            this.render(template, {controller: controller});
        }
    });

    App.TypeListRoute = Ember.Route.extend(App.RouteTemplateMixin, {
        genericTemplateName: '<type>/list',
        genericControllerName: '<type>ListController',

        model: function(params) {
            return this.get('db')[params.type.camelize().capitalize()].find();
        }
    });


    App.TypeDisplayRoute = Ember.Route.extend(App.RouteTemplateMixin, {
        genericTemplateName: '<type>/display',
        genericControllerName: '<type>DisplayController',

        model: function(params) {
            var _type = params.type.camelize().capitalize();
            var _id = params.id;
            return this.get('db')[_type].first({_id: _id, _type: _type});
        }
    });

    App.TypeNewRoute = Ember.Route.extend(App.RouteTemplateMixin, {
        genericTemplateName: '<type>/new',
        genericControllerName: '<type>NewController',

        model: function(params) {
            var _type = params.type.camelize().capitalize();
            return this.get('db')[_type].get('model').create({content: {}});
        }
    });

    App.TypeEditRoute = Ember.Route.extend(App.RouteTemplateMixin, {
        genericTemplateName: '<type>/edit',
        genericControllerName: '<type>EditController',

        model: function(params) {
            var _type = params.type.camelize().capitalize();
            var _id = params.id;
            return this.get('db')[_type].first({_id: _id, _type: _type});
        }
    });

    /***** Controllers ******/
    App.TypeNewController = Ember.Controller.extend({
        actions: {
            save: function() {
                var _this = this;
                this.get('model').save().then(function(model) {
                    var type = model.get('type').underscore();
                    var _id = model.get('_id');
                    _this.transitionToRoute('type.list', type);
                }, function(err){
                    alert('error', err);
                    return console.log('err', err);
                });
            }
        }
    });

    App.TypeEditController = Ember.Controller.extend({
        actions: {
            save: function() {
                var _this = this;
                this.get('model').save().then(function(model) {
                    var type = model.get('type').underscore();
                    var _id = model.get('_id');
                    _this.transitionToRoute('type.display', type, _id);
                }, function(err){
                    alert('error', err);
                    return console.log('err', err);
                });
            }
        }
    });

    // Ember.TEMPLATES = require('./templates');


    /**** Models *****/
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
                var fieldSchema = this.get('_schema')[key];
                if (!fieldSchema) {
                    continue;
                }
                var relationType = fieldSchema.type;

                // if the field is a relation
                if (!!App.getModelSchema(relationType)) {

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

            /* process descriptors (__title__, __description__, __thumb__)
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
            ['title', 'description', 'thumb'].forEach(function(item){
                var config = this.get('__config__')['__'+item+'__'];

                // precompile descriptor's templates if needed
                if (config && config.template) {
                    var compiledTemplate = Handlebars.compile(config.template);
                    this.set('_'+item+'CompiledTemplate', compiledTemplate);
                }

                // define the computed properties
                Ember.defineProperty(this, '__'+item+'__', Ember.computed(function(key) {
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

            }.bind(this));

        },

        _modelType: null,
        _contentChanged: 0,
        content: null,


        __config__: function() {
            return App.getModelConfig(this.get('_modelType'));
        }.property('_modelType'),


        /* _schema
         * Returns the model' schema
         */
        _schema: function() {
            return App.getModelSchema(this.get('type'));
        }.property('type'),


        /* _toJSONObject
         * Convert the model into a pojo ready to be serialized as JSON
         */
        _toJSONObject: function() {
            var pojo = {};
            var content = this.get('content');
            for (var fieldName in content) {
                var isRelation = App.db[this.get('type')].isRelation(fieldName);
                if (content[fieldName] && isRelation) {
                    var modelSchema = this.get('_schema');
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

                var fieldSchema = this.get('_schema')[fieldName];
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
            var type = this.get('_modelType');
            var endpoint = App.config.apiURI+'/'+type.underscore();
            var postData = {payload: this._toJSON()};
            return new Ember.RSVP.Promise(function(resolve, reject) {
                Ember.$.post(endpoint, postData, function(data) {
                    return resolve(App.db[type].get('model').create({
                        content: data.object
                    }));
                }).fail(function(jqXHR) {
                    alert('An error occured: ', jqXHR.responseText);
                    error = jqXHR.responseText;
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

        fieldsList: function() {
            var fields = Ember.A();
            var modelSchema = this.get('_schema');
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
                var watchContentPath = 'content';
                if (field.get('isMulti')) {
                    watchContentPath = 'content.@each.value';
                } else if (field.get('isI18n')) {
                    Ember.addObserver(field, 'content.@each.lang', field, '_triggerModelChanged');
                    watchContentPath = 'content.@each.value';
                }
                Ember.addObserver(field, watchContentPath, field, '_triggerModelChanged');
                fields.push(field);
            }
            return fields;
        }.property('_schema').readOnly(),


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
        },

        _observeFields: function() {
            Ember.run.debounce(this, this._updateContent, 300);
        }.observes('_contentChanged'),

        /**** properties ****/

        type: function() {
            return this.get('content._type') || this.get('_modelType');
        }.property('content._type', '_modelType').readOnly(),


        unknownProperty: function(key) {
            /*
             * If a property name ends with 'Field', then the ModelField
             * object is return. This is useful if we're looking for the
             * field schema and model relations...
             */
            if (Ember.endsWith(key, "Field")){
                var fieldName = key.slice(0, key.length - "Field".length);
                return this.get('_fields').get(fieldName);
            }
            else {
                return this.get('content.'+key);
            }
        }

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
            if (!query) {
                query = {};
            }
            var that = this;
            var modelType = this.get('type');
            // query._populate = false;
            return new Ember.RSVP.Promise(function(resolve, reject) {
                Ember.$.getJSON(that.get('endpoint'), query, function(data){
                    var results = Ember.A();
                    console.log(data);
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
        willDestroy: function () {
            var watchContentPath = 'content';
            if (this.get('isMulti')) {
                watchContentPath = 'content.@each.value';
            } else if (this.get('isI18n')) {
                watchContentPath = 'content.@each.value';
            }
            Ember.removeObserver(this, watchContentPath, this, '_triggerModelChanged');
        }
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


    // Render a model's field
    // type: is the template type (ex: display, form...)
    // name: the field name
    // model: the corresponding model
    // App.RenderFieldComponent = Ember.Component.extend(App.TemplateMixin, {
    //     tagName: 'span',
    //     name: null,
    //     type: null,
    //     model: null,

    //     // used in TemplateMixin
    //     modelType: Ember.computed.alias('model.type'),
    //     fieldName: Ember.computed.alias('name'),

    //     genericTemplateName: function() {
    //         var name = 'components/';

    //         var modelType = this.get('modelType');
    //         if (modelType) {
    //             name += '<generic_model>-';
    //         }

    //         var fieldName = this.get('name');
    //         if (fieldName) {
    //             name += '<generic_field>-';
    //         }

    //         name += this.get('type');

    //         return name;
    //     }.property('type', 'modelType', 'name')
    // });

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
        }.property('type')

    });

    App.RelationAutoSuggestComponent = Ember.TextField.extend({
        classNames: "typeahead",
        lookupFieldName: null,
        displayFieldName: null,
        value: null,
        field: null,

        didInsertElement: function() {
            this._super();
            var source = this.getSource();

            this.typeahead = this.$().typeahead({
                hint: false,
                minLength: 3
            }, {
                source: source.ttAdapter()
            });

            var _this = this;
            this.typeahead.on('typeahead:selected', function(event, item){
                _this.valueSelected(item);
            });
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
        },

        willDestroyElement: function() {},

        getSource: function() {

            var relationType = this.get('field.schema.type');
            var lookupFieldName = App.getModelConfig(relationType).searchField || 'title';
            var displayFieldName = this.get('displayFieldName') || '__title__';
            var field = this.get('field');

            var source = new Bloodhound({
                limit: 10,
                datumTokenizer: function (d) {
                    return Bloodhound.tokenizers.whitespace(d.value);
                },
                queryTokenizer: Bloodhound.tokenizers.whitespace,
                remote: {
                    url: '/api/1/'+relationType.underscore()+'?'+lookupFieldName+'[$iregex]=^%QUERY&_limit=9',
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
                        results.push({value: '--create new '+relationType+'--'});
                        return results;
                    }
                }
            });
            source.initialize();
            return source;
        }
    });

    /** Vendors components ***/
    App.DatePickerComponent = Ember.Component.extend({
        tagName: 'input',
        classNames: ['datepicker'],
        value: null,
        attributeBindings: ['dataValue:data-value', 'placeholder', 'name'],

        dataValue: function() {
            var date = this.get('value');
            if (date) {
                return date.getTime();
            }
            return '';
        }.property('value'),

        didInsertElement: function() {
            var _this = this;
            this.$().pickadate({
                onSet: function(context) {
                    var epoc = null;
                    if (context.select.pick) {
                        epoc = context.select.pick;
                    } else if (context.select) {
                        epoc = context.select;
                    }
                    if (epoc) {
                       _this.set('value', new Date(epoc));
                    }
                }
            });
        }
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

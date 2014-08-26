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
            this.set('config.currentLang', this.get('config.defaultLang'));
            Ember.$('title').text(this.get('config').name);
            console.log(this.get('config').name, 'is ready !');
        },

        getModelMeta: function(modelType) {
            var modelMeta = App.ModelMeta.create({content: this.config.schemas[modelType]});
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


    /***** Routes ******/

    App.ApplicationRoute = Ember.Route.extend({
        model: function() {
            return App.get('config');
        }
    });

    /* the RouteTemplateMixin allow all objects which implement the mixin to
     * use a generic template if a model doesn't specified one.
     */
    App.RouteTemplateMixin = Ember.Mixin.create({
        genericTemplateName: null,
        genericControllerName: null,

        modelType: function() {
            return this.get('routeName').split('.')[0].camelize().capitalize();
        }.property('routeName'),

        setupController: function(controller, model) {
            this._super(controller, model);
            // controller.set('model', model); // needed anymore ?
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


    App.GenericModelIndexRoute = Ember.Route.extend(App.RouteTemplateMixin, {
        genericTemplateName: '<generic_model>/list',
        genericControllerName: '<generic_model>Index',

        model: function(params) {
            var _type = this.get('modelType');

            // build query from model's meta
            var meta = App.getModelMeta(_type);
            var query = params.query || {};

            var limit = meta.get('views.index.limit');
            if (limit) {
                query._limit = limit;
            }

            query._populate = meta.get('indexViewPopulate');

            var filter = this.controllerFor(_type+'Index').get('currentSorting');
            if (filter) {
                query._sortBy = filter;
            } else {
                var metaSortBy = meta.get('views.index.sortBy');
                if (query._sortBy === undefined && metaSortBy) {
                    var order;
                    if (typeof(metaSortBy) === 'string') {
                        order = metaSortBy;
                    } else if (metaSortBy.filterBy('default').length) {
                        order = metaSortBy.filterBy('default')[0].order;
                    } else {
                        order = metaSortBy[0].order;
                    }
                    query._sortBy = order;
                }
            }
            return this.get('db')[_type].find(query);
        }
    });


    App.GenericModelDisplayRoute = Ember.Route.extend(App.RouteTemplateMixin, {
        genericTemplateName: '<generic_model>/display',
        genericControllerName: '<generic_model>Display',

        model: function(params) {
            var _type = this.get('modelType');
            var _id = params.id;
            var populate = App.getModelMeta(_type).get('displayViewPopulate');
            var query = {
                _id: _id,
                _type: _type,
                _populate: populate
            };
            return this.get('db')[_type].first(query);
        }
    });

    App.GenericModelNewRoute = Ember.Route.extend(App.RouteTemplateMixin, {
        genericTemplateName: '<generic_model>/new',
        genericControllerName: '<generic_model>New',

        model: function(params) {
            var _type = this.get('modelType');
            return this.get('db')[_type].get('model').create({content: {}});
        }
    });

    App.GenericModelEditRoute = Ember.Route.extend(App.RouteTemplateMixin, {
        genericTemplateName: '<generic_model>/edit',
        genericControllerName: '<generic_model>Edit',

        model: function(params) {
            var _type = this.get('modelType');
            var _id = params.id;
            var populate = App.getModelMeta(_type).get('editViewPopulate');
            var query = {
                _id: _id,
                _type: _type,
                _populate: populate
            };
            return this.get('db')[_type].first(query);
        }
    });


    /***** Controllers ******/

    /* The controllers handles the actions and all variables not needed beetween
     * two sessions.
     */


    App.ApplicationController = Ember.ObjectController.extend({
        applicationName: Ember.computed.alias('name')
    });


    /* There are 4 types of Generic controller:
     *
     *  - index
     *  - display
     *  - new
     *  - edit
     */

    /* This mixin is used to make the controller aware of the different actions available. */
    App.ActionControllerMixin = Ember.Mixin.create(Ember.TargetActionSupport, {
        actionSettings: function() {
            return this.get('__modelMeta__.views.'+this.get('viewName')+'.actions');
        }.property('viewName'),

        modelActions: function() {
            var actionSettings = this.get('actionSettings');
            var model = this.get('model');
            if (actionSettings === undefined) {
                actionSettings = [];
            }
            return actionSettings.map(function(action){
                // if the action is a toggled action, process it
                if (action.toggle) {
                    if (!action.field) {
                        alertify.error('WARNING ! action.field unknown. Please contact your administrator.', 0);
                    }
                    var value = model.get(action.field);
                    for (var key in action.toggle[value]) {
                        action[key] = action.toggle[value][key];
                    }
                }
                return {
                    name: action.name,
                    label: action.label || action.name,
                    isSecondary: action.secondary,
                    iconClass: action.icon,
                    cssClass: 'eureka-'+action.name.dasherize()+'-action'
                };
            });
        }.property('actionSettings', 'model._contentChanged'),

        mainModelActions: function() {
            return this.get('modelActions').filter(function(item) {
                return !item.isSecondary;
            });
        }.property('modelActions.[]'),

        secondaryModelActions: function() {
            return this.get('modelActions').filterBy('isSecondary');
        }.property('modelActions.[]'),

        actions: {
            trigger: function(actionName) {
               this.triggerAction({
                    action:actionName,
                    target: this
                });
            }
        }
    });

    /*
     * GenericModelIndexController
     *
     * This controller display a list the documents. It is responsible of
     * searching, and sorting the results.
     */
    App.GenericModelIndexController = Ember.ArrayController.extend({
        viewName: 'index',

        tableView: Ember.computed.alias('__modelMeta__.views.index.tableView'),

        filters: function() {
            return this.get('__modelMeta__.views.index.filters') || [];
        }.property('__modelMeta__.views.index.filters'),

        sorting: function() {
            var _filters = [];
            var sortBy = this.get('__modelMeta__.views.index.sortBy');
            if (typeof(sortBy) === 'object') {
                _filters = sortBy;
            }
            return _filters;
        }.property('__modelMeta__.views.index.sortBy'),

        defaultSorting: function() {
            return this.get('sorting').filterBy('default', true).objectAt(0);
        }.property('sorting'),

        currentSorting: Ember.computed.oneWay('defaultSorting.order'),

        updateModel: function() {
            var query = this.getWithDefault('query', {});
            var sortBy = this.get('currentSorting');
            query._sortBy = sortBy;

            var _this = this;
            var modelType = this.get('model').get('type');
            App.db[modelType].find(query).then(function(model) {
                _this.set('model', model);
            }, function(e) {
                alertify.error(e.error);
            });
        }.observes('query', 'currentSorting'),

        actions: {
            searchModel: function(query) {
                this.set('query', query);
            },
            displayItem: function(item) {
                var type = item.get('__meta__.decamelizedType');
                this.transitionToRoute(type+'.display', item.get('_id'));
            }
        }
    });

    /* Display a document */
    App.GenericModelDisplayController = Ember.ObjectController.extend(App.ActionControllerMixin, {
        viewName: 'display',
        actions: {
            "delete": function() {
                var _this = this;
                alertify.confirm("Are you sure you want to delete this document ?", function (e) {
                    if (e) {
                        var model = _this.get('model');
                        var type = model.get('__meta__.decamelizedType');
                        model.delete().then(function(data) {
                            _this.transitionToRoute(type+'.index');
                        }, function(jqXHR) {
                            console.log('error !!!', jqXHR);
                            alertify.error(jqXHR);
                        });
                    }
                });
            },
            edit: function() {
                var model = this.get('model');
                var type = model.get('__meta__.decamelizedType');
                var _id = model.get('_id');
                this.transitionToRoute(type+'.edit', _id);
            }
        }
    });


    /* Display a form to create a new document */
    App.GenericModelNewController = Ember.ObjectController.extend(App.ActionControllerMixin, {
        viewName: 'new',
        actions: {
            save: function() {
                var _this = this;
                this.get('model').save().then(function(model) {
                    var type = model.get('__meta__.decamelizedType');
                    _this.transitionToRoute(type+'.index');
                }, function(err){
                    alertify.error(err);
                    return console.log('err', err);
                });
            }
        }
    });


    /* Display a form to edit an existing document */
    App.GenericModelEditController = Ember.ObjectController.extend(App.ActionControllerMixin, {
        viewName: 'edit',
        actions: {
            save: function() {
                var _this = this;
                this.get('model').save().then(function(model) {
                    var type = model.get('__meta__.decamelizedType');
                    var _id = model.get('_id');
                    _this.transitionToRoute(type+'.display', _id);
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
    App.ModelMeta = Ember.ObjectProxy.extend({
        type: null,

        dasherizedType: function() {
            return this.get('type').dasherize();
        }.property('type').readOnly(),

        decamelizedType: function() {
            return this.get('type').underscore();
        }.property('type').readOnly(),

        label: function() {
            var value = this.get('content.label');
            if (typeof(value) === 'object') {
                value = value[App.get('config.selectedLang')];
                if (typeof(value) === 'object') {
                    value = value.singular;
                }
            }
            return value || this.get('type').underscore().replace(/_/g, ' ').capitalize();
        }.property('content.label', 'type', 'App.config.selectedLang'),

        fieldNames: function() {
            var names = [];
            for (var fieldName in this.get('properties')) {
                names.push(fieldName);
            }
            return names;
        }.property('properties'),

        pluralizedLabel: function() {
            var value = this.get('content.label');
            var pluralFound = false;
            if (typeof(value) === 'object') {
                value = value[App.get('config.selectedLang')];
                if (typeof(value) === 'object') {
                    value = value.plural;
                    pluralFound = true;
                }
            }
            if (!pluralFound) {
                value = this.get('label') + 's';
            }
            return value;
        }.property('content.label', 'App.config.selectedLang', 'label'),

        searchFieldName: function() {
            var lookupFieldName = this.get('content.views.index.search.field');
            if (!lookupFieldName) {
                if (this.get('content.aliases') && this.get('content.aliases').title) {
                    lookupFieldName = this.get('content.aliases').title;
                } else if (this.get('properties.title')) {
                    lookupFieldName = 'title';
                } else {
                    // TODO check this when starting server
                    alertify.log('WARNING ! no search field found for '+this.get('type')+'. Please contact your administrator ');
                }
            }
            return lookupFieldName;
        }.property('content.views.index.search.field', 'properties.title', 'content.aliases.title'),

        searchPlaceholder: function() {
            var placeholder = this.get('content.views.index.search.placeholder');
            if (!placeholder) {
                placeholder = "search a "+this.get('label')+"...";
            }
            return placeholder;
        }.property('content.views.index.search.placeholder', 'label'),

        indexViewPopulate: function() {
            return this.get('content.views.index.populate') || false;
        }.property('content.views.index.populate'),

        displayViewPopulate: function() {
            return this.get('content.views.display.populate') || true;
        }.property('content.views.display.populate'),

        editViewPopulate: function() {
            return this.get('content.views.edit.populate') || true;
        }.property('content.populate'),

        properties: function() {
            return this.get('content.schema');
        }.property('content.schema'),

        unknownProperty: function(key) {
            /*
             * If a property name ends with 'routeName', then the corresponding
             * route name is returned. This is useful when using link-to:
             *
             *    {{#link-to model.__meta__.indexRouteName}}list{{/link-to}}
             *
             * blogPostModel.__meta__.favoriteRouteName will return:
             *    'blog_post.favorite'
             */
            if (Ember.endsWith(key, "RouteName")){
                var routeName = key.slice(0, key.length - "RouteName".length);
                routeName = routeName.underscore();
                return this.get('decamelizedType')+'.'+routeName;
            } else if (Ember.endsWith(key, "CSS")) {
                var cssClass = key.slice(0, key.length - "CSS".length);
                if (cssClass.indexOf('GenericModel') > -1) {
                    cssClass = cssClass.replace(/GenericModel/g, this.get('type'));
                }
                return cssClass.dasherize();
            }
            return this.get('content.'+key);
        }
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

            if (!this.get('__meta__.properties')) {
                console.log('Error: cannot find any schema for '+this.get('__type__')+'. Are you sure there is a schema specified ?');
            }
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

            this.__buildI18nProperties();
            this.__buildAliases();
        },

        /* Build the i18n properties.
         * Basically, this method detect i18n fields of the model
         * and wrap their content into a `I18nProperty` object
         * which all to have access to specified properties:
         *
         *  blogPost.title -> I18nProperty
         *  blogPost.title.localValue -> the value of the current lang
         *  blogPost.title.en -> the engligh version of the value
         */
        __buildI18nProperties: function() {
            var content = this.get('content');
            for (var key in content) {

                var value = content[key];
                var field = this.get(key+'Field');
                if (!field) {
                    continue;
                }
                if (field.get('isI18n')) {
                    Ember.defineProperty(this, key, Ember.computed('content.key', function(fieldName) {
                        return App.I18nProperty.create({
                            field: field,
                            content: this.get('content.'+fieldName)
                        });
                    }));
                }
            }
        },

        /*
         * Build computed aliases (infos are taken from ModelMeta)
         */
        __buildAliases: function() {
            var aliases = this.get('__meta__.aliases');
            for (var alias in aliases) {
                var fieldName = aliases[alias];
                Ember.defineProperty(this, alias, Ember.computed.alias(fieldName));
            }
        },

        /* incremented each time the content is changed in
         * one of its field */
        _contentChanged: 0,
        content: null,

        __type__: null,

        __meta__: function() {
            return App.getModelMeta(this.get('__type__'));
        }.property('__type__'),

        title: function() {
            var _title;
            var contentTitle = this.get('content.title');
            if (contentTitle) {
                _title = contentTitle;
            } else {
                _title = this.get('content._id');
            }
            return _title;
        }.property('content.title', 'content._id'),

        description: function() {
            var _description;
            var contentDescription = this.get('content.description');
            if (contentDescription) {
                _description = contentDescription;
            }
            return _description;
        }.property('content.description'),

        /* _toJSONObject
         * Convert the model into a pojo ready to be serialized as JSON
         */
        _toJSONObject: function() {
            var pojo = {};
            var content = this.get('content');
            for (var fieldName in content) {
                var field = this.get(fieldName+'Field');
                if (!field) { // don't process special fields like _type, _id or _ref
                    pojo[fieldName] = content[fieldName];
                    continue;
                }
                var isRelation = App.db[this.get('type')].isRelation(fieldName);
                if (isRelation && content[fieldName]) {
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
                    // remove empty values
                    var value = content[fieldName];
                    if (value !== null) {
                        // i18n values
                        if (field.get('isI18n')) {
                            var values = {};
                            for (var _lang in value) {
                                // multi i18n values
                                if (field.get('isMulti')) {
                                    var items = [];
                                    value[_lang].forEach(function(item) {
                                        if(item) {
                                            items.push(item);
                                        }
                                    });
                                    if (items.length) {
                                        values[_lang] = items;
                                    } else {
                                        values[_lang] = null;
                                    }
                                // regular i18n values
                                } else {
                                    if (value[_lang]) {
                                        values[_lang] = value[_lang];
                                    }
                                }
                            }

                            if (Ember.isEmpty(values)) {
                                value = null;
                            } else {
                                value = values;
                            }

                        // multi values
                        } else if (field.get('isMulti')) {

                            var values = [];
                            value.forEach(function(item) {
                                if (item !== '') {
                                    values.push(item);
                                }
                            });
                            if (!values.length) {
                                value = null;
                            } else {
                                value = values;
                            }

                        // regular values
                        } else {
                            if (value === '') {
                                value = null;
                            }
                        }
                    }
                    pojo[fieldName] = value;
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
            var endpoint = App.get('config.apiURL')+'/'+type.underscore();
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
            var url = App.get('config.apiURL')+'/'+type.underscore()+'/'+this.get('_id');
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
                        if (field.get('isI18n')) {
                            for (var lang in value) {
                                var _values = value[lang];
                                _values.forEach(function(val) {
                                    values.pushObject(App.ModelFieldContent.create({
                                        value: val,
                                        lang: lang,
                                        field: field
                                    }));
                                });
                            }
                            if (values.length) {
                                // sort by lang and value
                                value = values.sort(function(a, b){
                                    if (a.get('lang') === b.get('lang')) {
                                        return a.get('value').localeCompare(b.get('value'));
                                    }
                                    return a.get('lang').localeCompare(b.get('lang'));
                                });
                            } else {
                                value = null;
                            }
                        } else {
                            if(!Ember.isArray(value)) {
                                value = [value];
                            }
                            value.forEach(function(val){
                                values.pushObject(App.ModelFieldContent.create({value: val, field: field}));
                            });

                            if (values.length) {
                                value = values.sortBy('value');
                                if (field.get('sortOrder') === 'desc') {
                                    value = value.reverse();
                                }
                            } else {
                                value = null;
                            }
                        }
                    } else if (field.get('isI18n')) {
                        for (var _lang in value) {
                            var _value = value[_lang];
                            values.pushObject(App.ModelFieldContent.create({
                                value: _value,
                                lang: _lang,
                                field: field
                            }));
                        }
                        if (values.length) {
                            // sort by lang
                            value = values.sortBy('lang');
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
                    if (field.get('isI18n')) {
                        var i18nValues = {};
                        content.forEach(function(item) {
                            var lang = item.get('lang');
                            if (!i18nValues[lang] && item.get('value') !== null) {
                                i18nValues[lang] = [];
                            }
                            if (item.get('value') !== null) {
                                i18nValues[lang].push(item.get('value'));
                            }
                        });
                        if (!Ember.isEmpty(i18nValues)) {
                            value = i18nValues;
                        }
                    } else {
                        value = [];
                        content.forEach(function(item){
                            if (item.get('value') !== null) {
                                value.push(item.get('value'));
                            }
                        });
                        if (value.length === 0) {
                           value = null;
                        }
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

        // _toTable: function() {
        //     var header = [];
        //     var columns = [];
        //     var fields = this.get('fieldsList');
        //     var _this = this;
        //     fields.forEach(function(field){
        //         header.push(field.get('name'));
        //         columns.push(field.get('content'));
        //     });
        //     return [header, columns];
        // }.property('_contentChanged'),

        /**** properties ****/

        type: function() {
            return this.get('content._type') || this.get('__type__');
        }.property('content._type', '__type__').readOnly(),


        unknownProperty: function(key) {
            var fieldName;
            /*
             * If a property name ends with 'Field', then the ModelField
             * object is returned. This is useful if we're looking for the
             * field schema and model relations...
             */
            if (Ember.endsWith(key, "Field")){
                fieldName = key.slice(0, key.length - "Field".length);
                var field = this.get('_fields').get(fieldName);
                if (field) {
                    return field;
                }
            }
            return this.get('content.'+key);
        }

    });

    /*
     * I18nProperty
     * This is the object return when we access to an i18n field
     * throw the model. For instance, a BlogPost with an i18n title
     *
     *  blogPost.title -> return an I18nProperty
     *  blogPost.title.en -> return the english value of the title
     *  blogPost.localValue -> return the value of the current lang
     *  blogPost.defaultValue -> return the value of the default lang
     */
    App.I18nProperty = Ember.ObjectProxy.extend({
        content: null,
        field: null,
        isI18n: true,

        localValue: function() {
            return this.get('content')[App.get('config.selectedLang')] || this.get('defaultValue');
        }.property('App.config.selectedLang', 'defaultValue'),

        defaultValue: function() {
            return this.get('content')[App.get('config.defaultLang')];
        }.property('App.config.defaultLang')
    });

    /* ResultSet
     * Contains an array of models returned by a promise
     */
    App.ResultSet = Ember.ArrayProxy.extend({
        type: null,
        content: null,

        __meta__: function() {
            return App.getModelMeta(this.get('type'));
        }.property('type'),

        schema: function() {
            return this.get('__meta__.schema');
        }.property('__meta__.schema'),

        fieldsList: function() {
            var fieldNames = this.get('__meta__.fieldNames');
            var _fiedsList = Ember.A();
            var _this = this;
            var modelMeta = App.getModelMeta(this.get('type'));
            fieldNames.forEach(function(fieldName) {
                _fiedsList.pushObject(App.ModelField.create({
                    name: fieldName,
                    schema: modelMeta.get('properties')[fieldName]
                }));
            });
            return _fiedsList;
        }.property('schema')

        // fields: function() {
        //     var _fields = Ember.A();
        //     for (var fieldName in this.get('schema')) {
        //         _fields.push({
        //             name: fieldName,
        //             structure: this.get('schema')[fieldName]
        //         });
        //     }
        //     return _fields;
        // }.property('schema'),
    });

    /* DatabaseModel
     * This object brings some convenients methods for getting results
     * from the server. A `DatabaseModel` is attached to the db and is
     * is related to a specific model.
     *
     * Usage example:
     *    App.db.BlogPost.find()
     */
    App.DatabaseModel = Ember.Object.extend({ // TODO use App.Model.reopenClass({}) instead
        type: null,
        model: null,

        __meta__: function() {
            return App.getModelMeta(this.get('type'));
        }.property('type'),

        properties: function() {
            return this.get('__meta__.schema');
        }.property('__meta__.schema'),

        endpoint: function() {
            return App.get('config.apiURL')+'/'+this.get('type').underscore();
        }.property('App.config.apiURL', 'type'),

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
                    console.log('++++', e);
                    console.log('----xxxx', {error: e.statusText, status: e.status});
                    return reject({error: e.statusText, status: e.status});
                });
            });
        },

        first: function(query) {
            var that = this;
            var modelType = this.get('type');
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

        label: function() {
            var value = this.get('schema.label');
            if (typeof(value) === 'object') {
                value = value[App.get('config.selectedLang')];
            }
            return value || this.get('name').underscore().replace(/_/g, ' ');
        }.property('schema.label', 'name', 'App.config.selectedLang'),

        hasContent: function() {
            if (this.get('isMulti') || this.get('isI18n')) {
                return !!this.get('content').length;
            } else {
                return this.get('content') !== null;
            }
        }.property('content'),

        cssClass: function() {
            return 'eureka-'+this.get('name').dasherize()+'-field';
        }.property('name'),

        isSafeString: function() {
            return !!this.get('schema').safeString;
        }.property('schema.safeString'),

        displayAllLanguages: function() {
            return !!this.get('schema.displayAllLanguages');
        }.property('schema.displayAllLanguages'),

        fallbackDefaultLang: function() {
            return !!this.get('schema.fallbackDefaultLang');
        }.property('schema.fallbackDefaultLang'),

        // /*
        //  * return the content that match the current language
        //  * if no content is found and `fallbackDefaultLang` is true
        //  * then return the content that match the default language
        //  */
        // currentLangContent: function() {
        //     var content;
        //     content = this.get('content').filterBy('lang', App.get('config.currentLang'));
        //     if (content.length === 0 && this.get('schema').fallbackDefaultLang) {
        //         content = this.get('content').filterBy('lang', App.get('config.defaultLang'));
        //     }
        //     if (!this.get('isMulti')) {
        //        content = content[0];
        //     }
        //     return content;
        // }.property('content', 'App.config.currentLang'),

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

        isHidden: function() {
            return !!this.get('schema.hidden');
        }.property('schema.hidden'),

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

        sortOrder: function() {
            return this.get('schema').sortOrder;
        }.property('schema.sortOrder'),

        contentLength: function() {
            return this.get('content').length;
        }.property('content.@each.value')
    });


    /* This is where the values from the forms will be stored
     * and displayed and extracted by _updateContent.
     * Model.fieldsList are responsible of creating a `ModelFieldContent`
     */
    App.ModelFieldContent = Ember.Object.extend({
        field: null,
        value: null,
        lang: null,
        isEditable: false,

        matchSelectedLang: function() {
            return this.get('lang') === App.get('config.selectedLang');
        }.property('lang', 'App.config.selectedLang'),

        matchSelectedOrFallbackLang: function() {
            var matches = this.get('lang') === App.get('config.selectedLang');
            var contentLength = this.get('field.content').filterBy('lang', App.get('config.selectedLang')).length;
            if (matches) {
                return true;
            } else if (!contentLength && this.get('field.fallbackDefaultLang')) {
                return this.get('lang') === App.get('config.defaultLang');
            }
        }.property('lang', 'App.config.selectedLang', 'App.config.defaultLang')
    });

    /*** Components ****/

    App.ApplicationMenuComponent = Ember.Component.extend({
        model: null, // the application model
        currentPath: null,

        currentType: function() {
            return this.get('currentPath').split('.')[0].camelize().capitalize();
        }.property('currentPath'),

        modelMetas: function() {
            var currentType = this.get('currentType');
            return Ember.keys(this.get('model.schemas')).map(function(modelName){
                var modelMeta = App.getModelMeta(modelName);
                if (currentType === modelName) {
                    modelMeta.set('isActive', true);
                } else {
                    modelMeta.set('isActive', false);
                }
                return modelMeta;
            });
        }.property('model.schemas', 'currentType')
    });


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
            this.set('layout', Ember.TEMPLATES[this.get('layoutName')]);
            this.rerender();
        }.observes('templateType')
    });

    /** index components **/
    App.ModelListComponent = Ember.Component.extend(App.TemplateMixin, {
        model: null,
        modelType: Ember.computed.alias('model.type'),
        genericTemplateName: 'components/<generic_model>-list',
    });

    App.ModelListTableComponent = Ember.Component.extend(App.TemplateMixin, {
        model: null,
        modelType: Ember.computed.alias('model.type'),
        genericTemplateName: 'components/<generic_model>-list-table',

        rows: function() {
            var results = Ember.A();
            var _this = this;
            var fieldsToDisplay = this.get('fieldsToDisplay');
            this.get('model').forEach(function(item) {
                var row = {model: item, fields: Ember.A()};
                item.get('fieldsList').forEach(function(field) {
                    if (!fieldsToDisplay || fieldsToDisplay && fieldsToDisplay.indexOf(field.get('name')) > -1) {
                        row.fields.pushObject(field);
                    }
                });
                results.pushObject(Ember.Object.create(row));
            });
            return results;
        }.property('model.@each._contentChanged'),

        fieldsToDisplay: function() {
            return this.get('model.__meta__.views.index.fields');
        }.property('model.__meta__.views.index.fields'),

        header: function() {
            var _headerFields = Ember.A();
            var field, fieldSchema;
            var _this = this;
            var fieldsToDisplay = this.get('fieldsToDisplay');
            this.get('model.fieldsList').forEach(function(field) {
                if (!fieldsToDisplay || fieldsToDisplay && fieldsToDisplay.indexOf(field.get('name')) > -1) {
                    _headerFields.pushObject(field.get('label'));
                }
            });
            return _headerFields;
        }.property('fieldsToDisplay', 'model.fieldsList', 'App.config.selectedLang'),

        actions: {
            itemClicked: function(item) {
                this.sendAction('itemClicked', item);
            }
        }
    });

    /** display components **/

    App.ModelDisplayComponent = Ember.Component.extend(App.TemplateMixin, {
        model: null,
        modelType: Ember.computed.alias('model.type'),
        genericTemplateName: 'components/<generic_model>-display',

        fields: function() {
            var fields = Ember.A();
            this.get('model').get('fieldsList').forEach(function(field){
                if (field.get('hasContent')) {
                    fields.pushObject(field);
                }
            });
            return fields;
        }.property('model.fieldsList'),

        fieldsets: function() {
            var _this = this;
            var _fieldsets = Ember.A();
            var metaFieldsets = this.get('model.__meta__.fieldsets');

            if (!metaFieldsets) {
                return _fieldsets;
            }

            var alreadyDone = [];
            var field;
            if (metaFieldsets.length) {
                metaFieldsets.forEach(function(metaFieldset) {
                    var fields = Ember.A();
                    metaFieldset.fields.forEach(function(fieldName) {
                        field = _this.get('model.'+fieldName+'Field');
                        if (field.get('hasContent')) {
                            fields.pushObject(field);
                        }
                        alreadyDone.push(fieldName);
                    });
                    if (fields.length) {
                        var fieldset = Ember.Object.create({
                            label: metaFieldset.label,
                            fields: fields
                        });
                        _fieldsets.pushObject(fieldset);
                    }
                });
            }

            // add fields left
            var _fieldsLeft = Ember.A();
            for (var name in this.get('model.__meta__.schema')) {
                if (alreadyDone.indexOf(name) === -1) {
                    field = _this.get('model.'+name+'Field');
                    if (field.get('hasContent')) {
                        _fieldsLeft.pushObject(field);
                    }
                }
            }
            _fieldsets.unshiftObject(Ember.Object.create({
                label: '',
                fields: _fieldsLeft
            }));
            return _fieldsets;
        }.property('model.__meta__.fieldsets')
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
            var _fields;
            if (!model) {
                _fields = Ember.A();
            } else {
                _fields = model.get('fieldsList');
            }

            // create the empty field content for each i18n which are not
            // `displayAllLanguages` and who doesn't have content
            _fields.filter(function(field) {
                if (field.get('isI18n') && !field.get('displayAllLanguages')){
                    return field;
                }
            }).forEach(function(field) {
                var currentLang = App.get('config.selectedLang');
                var currentLangValues = field.get('content').filterBy('lang', currentLang);
                if (currentLangValues.length === 0 && !field.get('isMulti')) {
                    field.get('content').pushObject(App.ModelFieldContent.create({value: null, lang: currentLang, field: field}));
                }
            });

            return _fields;
        }.property('model.fieldsList', 'App.config.selectedLang'),

        fieldsets: function() {
            var _this = this;
            var _fieldsets = Ember.A();
            var metaFieldsets = this.get('model.__meta__.fieldsets');

            if (!metaFieldsets) {
                return _fieldsets;
            }

            var alreadyDone = [];
            if (metaFieldsets.length) {
                metaFieldsets.forEach(function(metaFieldset) {
                    var fields = Ember.A();
                    metaFieldset.fields.forEach(function(fieldName) {
                        fields.pushObject(_this.get('model.'+fieldName+'Field'));
                        alreadyDone.push(fieldName);
                    });
                    var fieldset = Ember.Object.create({
                        label: metaFieldset.label,
                        fields: fields
                    });
                    _fieldsets.pushObject(fieldset);
                });
            }

            // add fields left
            var _fieldsLeft = Ember.A();
            for (var name in this.get('model.__meta__.schema')) {
                if (alreadyDone.indexOf(name) === -1) {
                    _fieldsLeft.pushObject(_this.get('model.'+name+'Field'));
                }
            }
            _fieldsets.unshiftObject(Ember.Object.create({
                label: '',
                fields: _fieldsLeft
            }));
            return _fieldsets;
        }.property('model.__meta__.fieldsets')
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

                        item = App.ModelFieldContent.create({value: value, field: field});
                        if (field.get('isI18n')) {
                            if (!field.get('displayAllLanguages')) {
                                item.set('lang', App.get('config.selectedLang'));
                            }
                        } else {
                            item.set('isEditable', true);
                        }
                        field.get('content').pushObject(item);
                    }
                    else {
                        if (field.get('isRelation')) {
                            field.set('content', field.get('relationModel').create({
                                content: {}
                            }));
                            field.set('isEditable', true);
                        } else if (field.get('isI18n')) {
                            item = App.ModelFieldContent.create({value: null, lang: null, field: field});
                            if (!field.get('displayAllLanguages')) {
                                item.set('lang', App.get('config.selectedLang'));
                            }
                            field.get('content').pushObject(item);
                        }
                    }
                } else {
                    if (!field.get('isMulti') && !field.get('isI18n')) {
                        field.set('isEditable', false);
                    } else if (!field.get('isRelation')) {
                        if (field.get('isI18n')) {
                            item = App.ModelFieldContent.create({value: null, lang: null, field: field});
                            if (!field.get('displayAllLanguages')) {
                                item.set('lang', App.get('config.selectedLang'));
                            }
                        }
                        else {
                            item = App.ModelFieldContent.create({value: null, isEditable: true, field: field});
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
        lang: null,

        fieldName: function() {
            return this.get('field.name');
        }.property('field.name'),

        dasherizedFieldName: function() {
            return this.get('fieldName').dasherize();
        }.property('fieldName'),

        dasherizedFieldNameLang: function() {
            return this.get('dasherizedFieldName')+'-lang';
        }.property('dasherizedFieldName'),

        schema: function() {
            return this.get('field.schema');
        }.property('field'),

        type: function() {
            return this.get('schema.type');
        }.property('schema.type'),

        isI18n: function() {
            return this.get('field.isI18n');
        }.property('field.isI18n'),

        displayAllLanguages: function() {
            return this.get('field.displayAllLanguages');
        }.property('field.displayAllLanguages'),

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
                    var wrappedObj = App.ModelFieldContent.create({value: obj, isEditable: false, field: field});
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
                    content.pushObject(App.ModelFieldContent.create({value: emptyItem, isEditable: true, field: field}));
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
            var typeMeta = App.getModelMeta(relationType);
            if (!searchFieldName) {
                searchFieldName = typeMeta.get('searchFieldName');
            }
            var displayFieldName = this.get('displayFieldName') || 'title';
            var field = this.get('field');

            var source = new Bloodhound({
                limit: 10,
                datumTokenizer: function (d) {
                    return Bloodhound.tokenizers.whitespace(d.value);
                },
                queryTokenizer: Bloodhound.tokenizers.whitespace,
                remote: {
                    url: App.get('config.apiURL')+'/'+relationType.underscore()+'?'+searchFieldName+'[$iregex]=^%QUERY&_limit=9',
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
                        results.push({value: '-- create new '+typeMeta.get('label').toLowerCase()+' --'});
                        return results;
                    }
                }
            });
            source.initialize();
            return source;
        }
    });

    /*** query components **/

    App.SearchQueryComponent = Ember.Component.extend({
        model: null,

        didInsertElement: function() {
            var _this = this;
            var $hintMessage = this.$('.eureka-hint-message');
            $hintMessage.hide();
            this.$('.eureka-search-query-input').focusin(function() {
                $hintMessage.show('slow');
            });
            this.$('.eureka-search-query-input').focusout(function() {
                $hintMessage.hide('slow');
            });
        },

        actions: {
            searchModel: function(query){
                this.sendAction('action', query);
            }
        }
    });

    App.SearchQueryInputComponent = Ember.TextField.extend({
        model: null,
        autocomplete: 'off',
        onEvent: 'keyPress',
        classNames: 'eureka-search-query-input form-control',

        placeholder: function() {
            var modelType = this.get('model').get('type');
            return App.getModelMeta(modelType).get('searchPlaceholder');
        }.property('model.type'),

        focusOut: function(e) {
            this.sendQuery();
        },

        keyPress: function(e) {
            if (e.keyCode === 13) {
                 // remove any question marks ('?') at the begining of the query
                this.set('value', this.get('value').replace(/^\?+/,""));

                this.sendQuery();
                e.preventDefault();
                e.stopPropagation();
            }
        },

        didInsertElement: function() {
            var currentModelContext;
            var _this = this;
            this.$().textcomplete([
                { // fields available
                    match: /(^|\s*)\?(\w*)$/,
                    replace: function (value) {
                        var model = _this.get('model');
                        currentModelContext = model
                          .get('__meta__.properties')[value].type;
                        return '$1' + value;
                    },
                    search: function (term, callback) {
                        var model = _this.get('model');
                        var fieldsList = model.get('fieldsList').map(function(field){
                            return field.name;
                        });
                        callback($.map(fieldsList, function (word) {
                            return word.indexOf(term) === 0 ? word : null;
                        }));
                    },
                    index: 2,
                    appendTo: '.eureka-section-search'
                }, { // fields available in relations
                    match: /([\w\.]+)\.(\w*)$/,
                    replace: function(value) {
                        currentModelContext = App.getModelMeta(currentModelContext)
                          .get('properties')[value].type;
                        return '$1.' + value;
                    },
                    search: function (term, callback) {
                        var relProperties = App.getModelMeta(currentModelContext)
                          .get('properties');
                        var relFieldNames = [];
                        for (var prop in relProperties) {
                            relFieldNames.push(prop);
                        }
                        var results = $.map(relFieldNames, function (word) {
                            return word.indexOf(term) === 0 ? word : null;
                        });
                        if (results.length === 1 && results[0] === term) {
                            results = [];
                        }
                        callback(results);
                    },
                    index: 2,
                    appendTo: '.eureka-section-search'
                }
            ]);
        },

        willDestroyElement: function() {
            this.$().textcomplete('destroy');
        },

        parseQuery: function(value) {
            var _this = this;
            var query = {};
            value = value.trim();
            value.split('&&').forEach(function(statement) {
                var splited;
                if (statement.indexOf('>') > -1) {
                    splited = statement.split('>');
                    query[splited[0].trim()] = {'$gt': splited[1].trim()};
                } else if (statement.indexOf('<') > -1) {
                    splited = statement.split('<');
                    query[splited[0].trim()] = {'$lt': splited[1].trim()};
                } else if (statement.indexOf('!=') > -1) {
                    splited = statement.split('!=');
                    query[splited[0].trim()] = {'$ne': splited[1].trim()};
                } else if (statement.indexOf('=') > -1) {
                    splited = statement.split('=');
                    query[splited[0].trim()] = splited[1].trim();
                } else {
                    var modelType = _this.get('model').get('type');
                    var searchFieldName = App.getModelMeta(modelType).get('searchFieldName');
                    query[searchFieldName] = {'$iregex': '^'+value};
                }
            });
            query._populate = this.get('model.__meta__.indexViewPopulate');
            return query;
        },

        sendQuery: function() {
            var query = this.parseQuery(this.get('value'));
            this.sendAction('action', query);
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
            return this.get('model.thumbUrl');
        }.property('model.thumbUrl'),

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

    /* renderTitle helper
     * will generate the 'generic_model.__title__' template.
     * To overwrite the title display of a model, just add the corresponding
     * template. For instance, to make a custom display of a blog post title,
     * create the template `blog_post.__title__.hbs`
     */
    Ember.Handlebars.registerHelper('renderTitle', function(contextModel, options) {
        var model = Ember.Handlebars.get(this, contextModel, options);
        var templateName = model.get('__meta__.decamelizedType')+"/__title__";
        if (!Ember.TEMPLATES[templateName]) {
            templateName = "generic_model/__title__";
        }
        options.types[0] = "STRING";
        options.types.push("STRING");
        options.contexts.unshift(templateName);
        return Ember.Handlebars.helpers.render.call(this, templateName, contextModel, options);
    });

    /* renderDescription helper
     * will generate the 'generic_model.__description__' template.
     * To overwrite the description display of a model, just add the corresponding
     * template. For instance, to make a custom display of a blog post description,
     * create the template `blog_post.__description__.hbs`
     */
    Ember.Handlebars.registerHelper('renderDescription', function(contextModel, options) {
        var model = Ember.Handlebars.get(this, contextModel, options);
        var templateName = model.get('__meta__.decamelizedType')+"/__description__";
        if (!Ember.TEMPLATES[templateName]) {
            templateName = "generic_model/__description__";
        }
        options.types[0] = "STRING";
        options.types.push("STRING");
        options.contexts.unshift(templateName);
        return Ember.Handlebars.helpers.render.call(this, templateName, contextModel, options);
    });

    App.ApplicationConfig = Ember.Object.extend({
        // application config used in App.config
        // add here some custom methods

        defaultLang: 'en',
        selectedLang: function() {
            return this.get('currentLang') || this.get('defaultLang');
        }.property('currentLang', 'defaultLang')
    });


    /**** Initialization *****/

    // attach the config to the application
    App.initializer({
        name: "eureka-config",
        before: 'eureka-models-routes-controllers-generation',

        initialize: function(container, application) {
            application.register('eureka:config', App.ApplicationConfig.create(clientConfig), {instantiate: false});
            application.inject('route', 'config', 'eureka:config');
            application.set('config', App.ApplicationConfig.create(clientConfig));
        }
    });

    // generate models, routes and controllers from the schema
    App.initializer({
        name: 'eureka-models-routes-controllers-generation',
        before: 'eureka-db',

        initialize: function(container, application) {
            for (var _type in clientConfig.schemas) {

                if (_type === 'Basic') {
                    throw new Ember.Error("'Basic' is a reserved word and can not be used as model name");
                }

                var underscoredType = _type.underscore();
                // router
                application.Router.map(function() {
                    this.resource(underscoredType, function(){
                        this.route('new', {path: '/new'});
                        this.route('display', {path: '/:id'});
                        this.route('edit', {path: '/:id/edit'});
                    });
                });

                // model
                var modelName = _type+'Model';
                if (!application[modelName]) {
                    application[modelName] = application.Model.extend({'__type__': _type});
                } else {
                    application[modelName].reopen({__type__: _type});
                }

                // routes
                ['IndexRoute', 'NewRoute', 'DisplayRoute', 'EditRoute'].forEach(function(routeName) {
                    if (!application[_type+routeName]) {
                        application[_type+routeName] = application['GenericModel'+routeName].extend();
                    }
                });

                // controllers
                var content = {__modelMeta__: application.getModelMeta(_type)};
                ['IndexController', 'NewController', 'DisplayController', 'EditController'].forEach(function(ctrlName) {
                    if (!application[_type+ctrlName]) {
                        application[_type+ctrlName] = application['GenericModel'+ctrlName].extend(content);
                    } else {
                        application[_type+ctrlName].reopen(content);
                    }
                });
            }
        }
    });

    // attach the database to the application
    App.initializer({
        name: "eureka-db",

        initialize: function(container, application) {
            var database = (function() {
                var db = Ember.Object.create();
                for (var _type in clientConfig.schemas) {
                    var dbTypeObject = App.DatabaseModel.create({
                        type: _type
                    });
                    var Model = application[_type+'Model'];
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

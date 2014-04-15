// var Ember = require('ember');

App = Ember.Application.create({
    ready: function() {
        Ember.$('title').text(this.get('config').name);
        console.log(this.get('config').name, 'is ready !');
    }
});

App.Router.map(function() {
    this.resource('type', { path: '/' }, function() {
        this.route('show', {path: '/:type/:id'});
        this.route('edit', {path: '/:type/:id/edit'});
        this.route('new', {path: '/:type/new'});
        this.route('list', {path: '/:type'});
    });
});

App.ApplicationRoute = Ember.Route.extend({
    model: function() {
        return App;
    }
});

App.ApplicationController = Ember.Controller.extend({
    modelNames: function() {
        var _modelNames = [];
        for (var modelName in App.config.schemas){
            _modelNames.push({classified: modelName.camelize().capitalize(), underscored: modelName.underscore()});
        }
        return _modelNames;
    }.property('App.config.schemas')
});


App.TypeListRoute = Ember.Route.extend({
    model: function(params) {
        return {type: params.type, results: ['TODO']};
        // var type = _.str.classify(params.type);
        // return new Ember.RSVP.Promise(function(resolve, reject) {
        //     App.db[type].find({}, function(err, data) {
        //         if(err) {
        //             return reject(err);
        //         }
        //         else{
        //             var objects = [];
        //             data.forEach(function(item) {
        //                 objects.push(item.toJSONObject());
        //             });
        //             var model = {type: params.type, objects: objects, data:data};
        //             resolve(model);
        //         }
        //     });
        // });
    },
    renderTemplate: function(controller, model) {
        var template = 'type/list';
        console.log(model);
        if (Ember.TEMPLATES[model.type+'/list']) {
            template = model.type+'/list';
        }
        return this.render(template);
    }
});

App.IndexRoute = Ember.Route.extend({
  model: function() {
    return ['red', 'yellow', 'blue'];
  }
});

// Ember.TEMPLATES = require('./templates');

// module.exports = (function(config){
Eurekapp = (function(config){
    App.initializer({
        name: "oreka",

        initialize: function(container, application) {
            application.register('oreka:config', config, {instantiate: false});
            application.inject('route', 'config', 'oreka:config');
            application.set('config', config);

        }
    });
    return App;
});
var Ember = require('ember');

App = Ember.Application.create({
    ready: function() {
        console.log('hello >>', this.get('config'));
    }
});

App.IndexRoute = Ember.Route.extend({
  model: function() {
    console.log('i[oo]--->', this.get('config'));
    return ['red', 'yellow', 'blue'];
  }
});

Ember.TEMPLATES = require('./templates');

module.exports = (function(config){
    App.initializer({
        name: "oreka",

        initialize: function(container, application) {
            application.register('oreka:config', config, {instantiate: false});
            application.inject('route', 'config', 'oreka:config');
            application.inject('application', 'config', 'oreka:config');

        }
    });
    return App;
});
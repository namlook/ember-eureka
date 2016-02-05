import Ember from 'ember';
import EurekaResolver from 'ember-eureka/resolver';
import loadInitializers from 'ember/load-initializers';
import config from './config/environment';

let App;

Ember.MODEL_FACTORY_INJECTIONS = true;

App = Ember.Application.extend({
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver: EurekaResolver
});

loadInitializers(App, config.modulePrefix);

export default App;

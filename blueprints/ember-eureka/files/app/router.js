import Ember from 'ember';
import config from './config/environment';
import generateEurekaRoutes from 'ember-eureka/eureka-routes-generation';

var Router = Ember.Router.extend({
  location: config.locationType
});

export default Router.map(function() {
    generateEurekaRoutes(this, config);
});
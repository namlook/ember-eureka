import Ember from 'ember';
import config from './config/environment';
import generateEurekaRoutes from 'ember-eureka/eureka-routes-generation';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
    generateEurekaRoutes(this, config);
});

export default Router;

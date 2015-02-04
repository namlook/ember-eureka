
import Ember from 'ember';
import config from '../config/environment';


export function initialize(container, application) {
    var appConfig = Ember.Object.create(config.APP);

    application.register('config:main', appConfig, {instantiate: false, singleton: true});
    application.inject('route', 'config', 'config:main');
    application.inject('controller', 'config', 'config:main');
    application.inject('model', 'config', 'config:main');
}

export default {
  name: 'eureka-structure',
  initialize: initialize
};

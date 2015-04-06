
import Ember from 'ember';
import config from '../config/environment';

/** check reserved keywords and fill
 *  'auto' views with default configuration
 */
export function initialize(container, application) {

    var appConfig = Ember.Object.create(JSON.parse(JSON.stringify(config.APP)));

    application.register('appConfig:main', appConfig, {instantiate: false, singleton: true});
    application.inject('route', 'appConfig', 'appConfig:main');
    application.inject('controller', 'appConfig', 'appConfig:main');
    application.inject('model', 'appConfig', 'appConfig:main');
}

export default {
  name: 'eureka-structure',
  initialize: initialize
};

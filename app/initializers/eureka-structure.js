
import Ember from 'ember';
import config from '../config/environment';

var modelReservedKeyword = ['default', 'basic', 'application', 'widgets', 'object', 'collection', 'model', 'resource', 'outlet'];

/** check reserved keywords and fill
 *  'auto' views with default configuration
 */
export function initialize(container, application) {

    /*** check reserved resource keywords ***/
    var resources = config.APP.structure.resources;
    Ember.keys(resources).forEach(function(resource) {
        if (modelReservedKeyword.indexOf(resource.toLowerCase()) > -1) {
            throw("Eureka: '"+resource+"' is a reserved keyword. Don't use it as model name");
        }
    });

    var appConfig = Ember.Object.create(config.APP);

    application.register('appConfig:main', appConfig, {instantiate: false, singleton: true});
    application.inject('route', 'appConfig', 'appConfig:main');
    application.inject('controller', 'appConfig', 'appConfig:main');
    application.inject('model', 'appConfig', 'appConfig:main');
}

export default {
  name: 'eureka-structure',
  initialize: initialize
};


import Ember from 'ember';
import config from '../config/environment';

var modelReservedKeyword = ['default', 'basic', 'application', 'widgets', 'object', 'collection', 'model'];

var checkModelReservedKeywords = function(structure) {
    Ember.keys(structure.models).forEach(function(modelType) {
        if (modelReservedKeyword.indexOf(modelType.toLowerCase()) > -1) {
            throw("Eureka: '"+modelType+"' is a reserved keyword. Don't use it as model name");
        }
    });
};

export function initialize(container, application) {

    checkModelReservedKeywords(config.APP.structure);
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

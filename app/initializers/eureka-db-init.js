
import Ember from 'ember';
import Database from 'ember-eureka/database';
import Store from 'ember-eureka/store';

export function initialize(container, application) {
  var config = container.resolve('config:main');

  var db = Database.create({endpoint: config.apiEndpoint});
  var modelStructure = config.structure.models;

  Ember.keys(modelStructure).forEach(function(modelType) {
    var Model = container.resolve('model:'+modelType.dasherize());
    if (!Model) {
      Model = container.resolve('model:generic');
    }
    db[modelType] = Store.create({
        db:db,
        modelClass: Model,
        modelType: modelType,
        modelStructure: modelStructure[modelType]
    });
  });

  application.register('db:main', db, {instantiate: false, singleton: true});
  application.inject('route', 'db', 'db:main');
  application.inject('controller', 'db', 'db:main');
  application.inject('model', 'db', 'db:main');

}

export default {
  name: 'eureka-db-init',
  after: 'eureka-routes-generation',
  initialize: initialize
};

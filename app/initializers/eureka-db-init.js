
import Ember from 'ember';
import Database from 'ember-eureka/database';
import Store from 'ember-eureka/store';

export function initialize(container, application) {
  var appConfig = container.resolve('appConfig:main');

  var db = Database.create({endpoint: appConfig.apiEndpoint});
  var modelStructure = appConfig.structure.models;

  Ember.keys(modelStructure).forEach(function(modelType) {
    var Model = container.resolve('model:'+modelType.dasherize());
    if (!Model) {
      Model = container.resolve('model:generic');
    }
    db[modelType] = Store.create({
        db:db,
        modelClass: Model,
        modelType: modelType,
        modelStructure: modelStructure[modelType],
        /** we pass the container here so we can resolve
         * the components and template path inside field and model's meta.
         * For instance, the container is used in `FieldMeta.displayWidgetComponentName`
         */
        container: container
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


import Ember from 'ember';
import Database from 'ember-eureka/database';
import Store from 'ember-eureka/store';

export function initialize(container, application) {
  var appConfig = container.resolve('appConfig:main');

  var db = Database.create({endpoint: appConfig.apiEndpoint});
  var resourcesStructure = appConfig.structure.resources;

  Ember.keys(resourcesStructure).forEach(function(resource) {
    var Model = container.resolve('model:'+resource.dasherize());
    if (!Model) {
      Model = container.resolve('model:generic');
    }
    db[resource] = Store.create({
        db:db,
        modelClass: Model,
        resource: resource,
        resourceStructure: resourcesStructure[resource],
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
  after: 'eureka-generic-routes-controllers',
  initialize: initialize
};

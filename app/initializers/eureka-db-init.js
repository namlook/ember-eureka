
import Ember from 'ember';
import config from '../config/environment';
import Database from 'ember-eureka/database';
import Store from 'ember-eureka/store';

export function initialize(container, application) {
  var appConfig = JSON.parse(JSON.stringify(config.APP));

  var db = Database.create({endpoint: appConfig.apiEndpoint});
  var eurekaResources = appConfig.eureka.resources;

  Object.keys(eurekaResources).forEach(function(resource) {
    var Model = container.resolve('model:'+resource.dasherize());
    if (!Model) {
      Model = container.resolve('model:generic');
    }

    var store = Store.create({
        db:db,
        modelClass: Model,
        resource: resource,
        resourceStructure: eurekaResources[resource],
        /** we pass the container here so we can resolve
         * the components and template path inside field and model's meta.
         * For instance, the container is used in `FieldMeta.displayWidgetComponentName`
         */
        container: container
    });

    db.set(resource, store);
    db[resource] = store;
  });

  /** build computed properties after the full resources registration
   * so we can build relation computed properties
   */
  Object.keys(eurekaResources).forEach(function(resource) {
    db[resource]._buildComputedPropertiesFromStructure();
  });

  application.register('db:main', db, {instantiate: false, singleton: true});
  application.inject('route', 'db', 'db:main');
  application.inject('controller', 'db', 'db:main');
  application.inject('model', 'db', 'db:main');
}

export default {
  name: 'eureka-db-init',
  initialize: initialize
};

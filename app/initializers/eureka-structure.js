
import Ember from 'ember';
import config from '../config/environment';

var modelReservedKeyword = ['default', 'basic', 'application', 'widgets', 'object', 'collection', 'model', 'outlet'];

var defaultViewConfiguration = {
    empty: {
        new: {
            widgets: [
                {type: 'model-form'}
            ]
        }
    },
    model: {
        index: {
            widgets: [
                {type: 'model-display'}
            ]
        },

        edit: {
            widgets: [
                {type: 'model-form'}
            ]
        }
    },
    collection: {
        index: {
            widgets: [
                {type: 'collection-display'}
            ]
        }
    }
};

/** check reserved keywords and fill
 *  'auto' views with default configuration
 */
export function initialize(container, application) {


    var models = config.APP.structure.models;

    var modelViews, views;

    Ember.keys(models).forEach(function(modelType) {

        // check reserved model keywords
        if (modelReservedKeyword.indexOf(modelType.toLowerCase()) > -1) {
            throw("Eureka: '"+modelType+"' is a reserved keyword. Don't use it as model name");
        }

        modelViews = models[modelType].views;

        if (modelViews === undefined) {
            return;
        }

        // iterate over view type: <modelType>.views.{collection, model, empty}
        Ember.keys(modelViews).forEach(function(viewType) {

            views = Ember.get(modelViews, viewType);

            if (views === undefined) {
                return ;
            }

            // iterate over views : <modelType>.views.{colleciton, model, empty}.<viewName>
            Ember.keys(views).forEach(function(viewName) {

                // fill 'auto' views with default configuration
                if (Ember.get(views, viewName) === 'auto') {
                    config.APP.structure.models[modelType].views[viewType][viewName] = defaultViewConfiguration[viewType][viewName];
                }
            });
        });
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

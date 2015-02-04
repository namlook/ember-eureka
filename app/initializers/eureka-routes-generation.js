
import Ember from 'ember';
import config from '../config/environment';

export function initialize(container, application) {

    Ember.keys(config.APP.structure.models).forEach(function(modelType) {

        var underscoredType = modelType.underscore();

        application.Router.map(function() {
            this.route(underscoredType, function(){
                this.route('collection', {path: '/'}, function() {
                    this.route('index', {path: '/'});
                });

                this.route('model.new', {path: '/new'});
                this.route('model', {path: '/:id'}, function() {
                    this.route('index', {path: '/'});
                    this.route('edit', {path: '/edit'});
                    // this.route('related', {path: '/:related'});
                });
            });
        });
    });
}

export default {
  name: 'eureka-routes-generation',
  after: 'eureka-structure',
  initialize: initialize
};

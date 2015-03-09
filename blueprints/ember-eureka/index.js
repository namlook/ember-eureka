/* jshint node: true */
'use strict';


module.exports = {

  locals: function(options) {
    // Return custom template variables here.
    var applicationName = options.project.pkg.name;
    return {applicationName: applicationName};
  },

  normalizeEntityName: function() {
    // allows us to run ember -g ember-eureka and not blow up
    // because ember cli normally expects the format
    // ember generate <entitiyName> <blueprint>
  },

  afterInstall: function() {

    // /**
    //  * Output messages to ui, enable in promises
    //  */
    // var ui = this.ui;

    // /**
    //  * Get the blueprint task
    //  */
    // var blueprintTask = this.taskFor('generate-from-blueprint');

    // /**
    //  * Blueprint task base options
    //  */
    // var options = {
    //   args: [],
    //   dryRun: false,
    //   verbose: false,
    //   disableAnalytics: false
    // };


    // return this.addPackagesToProject([
    //     {name: 'namlook/eurekapi'},
    //     {name: 'ember-typeahead-input'},
    //     {name: 'ember-dynamic-component'},
    //     {name: 'ember-bootstrap-hurry',},
    //     {name: 'ember-moment',},
    //     {name: "../../../eureka/eureka-mixin-actionable-widget"},
    //     {name: "../../../eureka/eureka-mixin-query-parametrable-widget"},
    //     {name: "../../../eureka/eureka-widget-application-menu"},
    //     {name: "../../../eureka/eureka-widget-application-navbar"},
    //     {name: "../../../eureka/eureka-widget-collection-display"},
    //     {name: "../../../eureka/eureka-widget-collection-navbar"},
    //     {name: "../../../eureka/eureka-widget-collection-query"},
    //     {name: "../../../eureka/eureka-widget-model-display"},
    //     {name: "../../../eureka/eureka-widget-model-form"},
    //     {name: "../../../eureka/eureka-widget-model-navbar"}
    // ]).then(function() {
    //     ui.writeLine('  Running ember-bootstrap-hurry blueprints');
    //     options.args = ['ember-bootstrap-hurry'];
    //     return blueprintTask.run(options);
    // }).then(function() {
    //     ui.writeLine('  Running ember-typeahead-input blueprints');
    //     options.args = ['ember-typeahead-input'];
    //     return blueprintTask.run(options);
    // }).then(function() {
    //     ui.writeLine('  Running ember-moment blueprints');
    //     options.args = ['ember-moment'];
    //     return blueprintTask.run(options);
    // });
  }
};

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

    /**
     * Output messages to ui, enable in promises
     */
    var ui = this.ui;

    /**
     * Get the blueprint task
     */
    var blueprintTask = this.taskFor('generate-from-blueprint');

    /**
     * Blueprint task base options
     */
    var options = {
      args: [],
      dryRun: false,
      verbose: false,
      disableAnalytics: false
    };

    return this.addPackagesToProject([
        {name: 'namlook/eurekapi'},
        {name: 'ember-dynamic-component'},
        {name: 'ember-bootstrap'}
    ]).then(function() {
        ui.writeLine('  Running the ember-bootstrap blueprint');
        options.args = ['ember-bootstrap'];
        return blueprintTask.run(options);
    });
  }
};

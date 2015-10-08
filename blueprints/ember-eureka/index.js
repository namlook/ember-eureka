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

    // return this.addAddonsToProject({
    //     packages: [
    //         {name: 'ember-moment', target: '4.0.1'},
    //         {name: 'emberx-select', target: '2.0.1'},
    //         {name: 'emberek-selectize', target: 'git://github.com/namlook/emberek-selectize.git#v0.0.3'},
    //         {name: 'eureka-mixin-actionable-widget', target: 'git://github.com/namlook/eureka-mixin-actionable-widget.git#v0.0.2'},
    //         {name: 'eureka-mixin-query-parametrable-widget', target: 'git://github.com/namlook/eureka-mixin-query-parametrable-widget.git#v0.0.1'},
    //         {name: 'eureka-widget-application-menu', target: 'git://github.com/namlook/eureka-widget-application-menu.git#v0.0.7'},
    //         {name: 'eureka-widget-application-navbar', target: 'git://github.com/namlook/eureka-widget-application-navbar.git#v0.0.6'},
    //         {name: 'eureka-widget-collection-display', target: 'git://github.com/namlook/eureka-widget-collection-display.git#v0.0.7'},
    //         {name: 'eureka-widget-collection-navbar', target: 'git://github.com/namlook/eureka-widget-collection-navbar.git#v0.0.2'},
    //         {name: 'eureka-widget-collection-query', target: 'git://github.com/namlook/eureka-widget-collection-query.git#v0.0.5'},
    //         {name: 'eureka-widget-model-display', target: 'git://github.com/namlook/eureka-widget-model-display.git#v0.0.6'},
    //         {name: 'eureka-widget-model-form', target: 'git://github.com/namlook/eureka-widget-model-form.git#v0.0.4'},
    //         {name: 'eureka-widget-model-navbar', target: 'git://github.com/namlook/eureka-widget-model-navbar.git#v0.0.3'},
    //         {name: 'ember-bootstrap-hurry', target: '0.0.1'}
                // +
                //     {name: 'ember-typeahead-input'}, ??
    //     ]
    // });

    // return this.addPackagesToProject([
    //     {name: 'namlook/eurekapi'},
    // });
  }
};

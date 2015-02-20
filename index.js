/* jshint node: true */
'use strict';

var path = require('path');

module.exports = {
    name: 'ember-eureka',

    config: function(env, baseConfig) {
        if (env) {
            if (!baseConfig.APP.structure) {
                baseConfig.APP.structure = require(path.resolve('.') + '/structure');
            }
        }
        return baseConfig;
    },

    included: function included(app) {
        this._super.included(app);
        app.import('vendor/styles.css');

    }
};

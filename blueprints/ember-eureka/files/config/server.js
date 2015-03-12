/* jshint node: true */

var pkg = require('../package.json');
var resources = require('ember-eureka/config/structure').resources;

module.exports = {
    name: pkg.name,
    version: 1,
    port: 4000,
    enableCORS: true,
    schemas: resources,
    publicDirectory: '/dist',
    database: {
        adapter: 'rdf',
        config: {
            store: 'virtuoso',
            host: process.env.DB_PORT_8890_TCP_ADDR,
            port: process.env.DB_PORT_8890_TCP_PORT,
            graphURI: 'http://<%= dasherizedPackageName %>.com'
        }
    }
};
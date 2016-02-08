/* jshint node: true */

var pkg = require('../package.json');

var requireDir = require('require-dir');
var dockerLinks = require('docker-links');
var links = dockerLinks.parseLinks(process.env);

var internals = {
    port: 8888,
    uploadDirectory: './uploads',
    endpoint: 'http://<path/to/sparqlendpoint>' // TODO
};


if (process.env.NODE_ENV === 'production') {

    var dbUri = 'http://'+links.db.host + ':' + links.db.port;
    var virtuosoEndpoint = dbUri + '/sparql';
    var blazegraphEndpoint = dbUri + '/bigdata/sparql';

    internals.endpoint = virtuosoEndpoint
    internals.port = 80
    internals.uploadDirectory = '/app/uploads';
}

var secretInfos = require('./secret.json');

module.exports = {
    name: pkg.name,
    host: '0.0.0.0',
    port: internals.port,
    app: {
        secret: secretInfos.secret,
        email: secretInfos.email,
        clientRootUrl: 'http://', // TODO
        apiRootPrefix: '/api/1'
    },
    resources: requireDir('../backend/resources'),
    publicDirectory: 'dist',
    fileUploads: {
        uploadDirectory: internals.uploadDirectory,
        maxBytes: 50 // 50 MB
    },
    log: ['warn'],
    database: {
        config: {
            graphUri: 'http://<%= dasherizedPackageName %>.com',
            endpoint: internals.endpoint
        },
        schemas: requireDir('./schemas')
    },
    misc: {
        // custom config
    }
};

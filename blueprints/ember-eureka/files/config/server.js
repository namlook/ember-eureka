/* jshint node: true */

var pkg = require('../package.json');

var requireDir = require('require-dir');
var dockerLinks = require('docker-links');
var links = dockerLinks.parseLinks(process.env);

var internals = {
    database: {
        config: {
            engine: 'virtuoso',
            graphUri: 'http://<%= dasherizedPackageName %>.com',
            port: 8890,
            host: 'localhost', // TODO check this
            auth: {
                user: 'dba',
                password: 'dba'
            }
        }
    },
    redis: {
        port: 6379,
        host: 'localhost' // TODO check this
    },
    port: 8888,
    uploadDirectory: './uploads'
};


if (process.env.NODE_ENV === 'production') {
    internals.database.config.host = links.db.host;
    internals.database.config.port = links.db.port;

    internals.redis.port = links.redis.port;
    internals.redis.host = links.redis.host;

    internals.port = 80
    internals.uploadDirectory = '/app/uploads';
}

var secretInfos = require('./secret.json');

module.exports = {
    name: pkg.name,
    host: '0.0.0.0',
    port: internals.port,
    log: ['warn'],
    app: {
        secret: secretInfos.secret,
        email: secretInfos.email,
        clientRootUrl: 'http://', // TODO
        apiRootPrefix: '/api/1'
    },
    resources: requireDir('../backend/resources'),
    tasks: requireDir('../backend/tasks'),
    publicDirectory: 'dist',
    fileUploads: {
        uploadDirectory: internals.uploadDirectory,
        maxBytes: 50 // 50 MB
    },
    database: {
        adapter: 'rdf',
        config: internals.database.config,
        schemas: requireDir('./schemas')
    },
    redis: {
        port: internals.redis.port,
        host: internals.redis.host
    },
    misc: {
        // custom config
    }
};

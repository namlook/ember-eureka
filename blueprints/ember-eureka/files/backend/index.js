
var eureka = require('eurekajs');
var config = require('../config/server');

var eurekaServer = eureka(config);

eurekaServer.beforeRegister = function(_server, next) {
    _server.on('log', function(message) {
        console.log(message.tags, message.data);
    });
    next(null);
};

eurekaServer.start().then(function(server) {
    server.log('info', 'Server running at: http://'+server.info.address+':'+server.info.port);
}).catch(function(error) {
    console.log(error);
    console.log(error.stack);
    throw error;
});
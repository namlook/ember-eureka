/* jshint node: true */

var EurekaServer = require('eurekajs');
var config = require('../config/server');
var server = new EurekaServer(config);
server.start();
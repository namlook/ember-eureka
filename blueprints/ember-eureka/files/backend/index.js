/* jshint node: true */

var EurekaServer = require('eurekapi');
var config = require('../config/server');
var server = new EurekaServer(config);
server.start();
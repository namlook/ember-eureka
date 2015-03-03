/* global require */

var Eurekapi = require('eurekapi');

var config = require('../config/server');
config.schemas = require('../structure').resources;
var server = new Eurekapi(config);
server.start();
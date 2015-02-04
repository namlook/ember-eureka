/* global require */

var Eurekapi = require('eurekapi');

var config = require('../config/server');
config.schemas = require('../structure').models;
var server = new Eurekapi(config);
server.start();
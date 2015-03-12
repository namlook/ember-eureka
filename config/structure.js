/* jshint node: true */

/** this allows to require es6 modules **/
require('babel/register')({
    only: /config\/eureka/, // prevent to pollute the node_modules
});

var dirmapper = require('dirmapper');
var _ = require('lodash');
var path = require('path');

var resourceReservedKeyword = ['default', 'basic', 'application', 'widgets', 'object', 'collection', 'model', 'resource', 'outlet'];

var walkEurekaConfig = function(directories, path) {
    var config = {};
    var splitedKey, filename, extention, module;
    Object.keys(directories).forEach(function(key) {
        if (typeof(directories[key]) === 'object') {

            // directory
            config[key] = walkEurekaConfig(directories[key], path+'/'+key);

        } else {

            // filename
            splitedKey = key.split('.');
            extention = splitedKey.slice(-1)[0];
            filename = splitedKey.slice(0, -1).join('.');

            if (extention === 'js') { // skip non-js files
                module = require(path+'/'+filename); // require es6 module
                if (config[filename]) {
                    config[filename].outlet = module;
                } else {
                    config[filename] = module;
                }
            }
        }
    });
    return config;
};

var adjustResources = function(eurekaStructure) {

    if (!eurekaStructure.resources) {
        eurekaStructure.resources = {};
    }

    var classifiedResource;
    Object.keys(eurekaStructure.resources).forEach(function(resource) {
        if (resourceReservedKeyword.indexOf(resource) > -1) {
            throw("Eureka: '"+resource+"' is a reserved keyword. Don't use it as resource");
        }
        classifiedResource = _.capitalize(_.camelCase(resource));
        eurekaStructure.resources[classifiedResource] = eurekaStructure.resources[resource];
        delete eurekaStructure.resources[resource];
        eurekaStructure.resources[classifiedResource].schema = eurekaStructure.resources[classifiedResource].properties;
    });

    return eurekaStructure;
};

var buildEurekaConfig = function(eurekaConfigPath) {
    console.log('building eureka structure...');
    var eurekaDirectories = dirmapper(eurekaConfigPath).eureka;
    var eurekaStructure = walkEurekaConfig(eurekaDirectories, eurekaConfigPath);
    var eurekaConfig = adjustResources(eurekaStructure);
    console.log('done');
    return eurekaConfig;
};

module.exports = buildEurekaConfig(path.resolve('.') + '/config/eureka');

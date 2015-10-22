require('babel/register')({
    only: /config\/eureka/, // prevent to pollute the node_modules
});

var glob = require('glob');
var path = require('path');
var _ = require('lodash');
var requireDir = require('require-dir');
var inflector = require('inflected');


module.exports = (function() {
    var structure = {};
    glob.sync('./config/eureka/**/*').forEach(function(file) {

        var parsedPath = path.parse(file);
        var keyName = parsedPath.dir+'/'+parsedPath.name;
        keyName = _.trim(keyName, '.').replace(/\//g, '.');
        keyName = _.trim(keyName, '.');

        if (!_.endsWith(file, '.js')) {
            _.set(structure, keyName, null);
        } else {

            var content = require(path.resolve(file));

            if (_.get(structure, keyName) === null) {
                keyName += '.outlet';
            }

            _.set(structure, keyName, content);
        }
    });
    var schemas = requireDir(path.resolve('./config/schemas'));
    var resources = structure.config.eureka.resources;
    _.forOwn(schemas, function(config, name) {
        if (config.properties) {
            _.set(resources, name+'.properties', config.properties)
        }

        if (config.meta) {
            _.set(resources, name+'.meta', config.meta)
        }

        /** add plural names **/
         var plural = _.get(resources[name], 'meta.names.plural') || inflector.pluralize(name);
        _.set(resources[name], 'meta.names.plural', plural);
    });
    return structure;
})().config.eureka;
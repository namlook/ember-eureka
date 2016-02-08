
var genericRoutes = require('eurekajs/lib/contrib/generic-routes');

module.exports = function(options) {
    return {
        routes: genericRoutes(options)
    };
}
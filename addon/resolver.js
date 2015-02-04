
import Resolver from 'ember/resolver';

export default Resolver.extend({
    parseName: function(fullName) {
        /** if the route/controller/template doesn't exists,
         * resolve to the generic one. Example:
         *   if 'user/collection/index' is not defined,
         *   then resolve to 'generic/collection/index'
         */
        var parsedName = this._super(fullName);
        var normalizedModuleName = this.findModuleName(parsedName);
        if (!normalizedModuleName) {
            var splittedFullName = fullName.split(':');
            var type = splittedFullName[0];
            var path = splittedFullName[1];
            var genericFullName = type+':generic/'+path.split('/').splice(1).join('/');
            var newParsedName = this._super(genericFullName);
            normalizedModuleName = this.findModuleName(newParsedName);
            if (normalizedModuleName) {
                parsedName = newParsedName;
            }
        }
        return parsedName;
    }
});
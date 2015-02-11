
import Resolver from 'ember/resolver';

export default Resolver.extend({
    /** if the route/controller/template doesn't exists,
     * resolve to the generic one. Example:
     *
     *   if 'user/collection/index' is not defined,
     *   then resolve to 'generic/collection/index'
     *
     * If the generic's one doesn't exists (like a new route),
     * then resolve to the generic default one. Example:
     *
     *   if 'generic/model/stuff' is not defined,
     *   then resolve to 'generic/model/default'
     */
    parseName: function(fullName) {

        // try to resolve the path
        var parsedName = this._super(fullName);
        var normalizedModuleName = this.findModuleName(parsedName);

        // if the path is not found, then try the generic's one
        if (!normalizedModuleName) {

            // build the generic path
            var splittedFullName = fullName.split(':');
            var type = splittedFullName[0];
            var path = splittedFullName[1];
            var genericFullName = type+':generic/'+path.split('/').splice(1).join('/');

            // try to resolve the path
            parsedName = this._super(genericFullName);
            normalizedModuleName = this.findModuleName(parsedName);

            // if the generic path dosen't exists, then try the genric's default one
            if (!normalizedModuleName) {

                // build the generic default path (we only need the type: model or collection)
                var genericDefaultName = type+':generic/'+path.split('/')[1]+'/default';
                parsedName = this._super(genericDefaultName);
            }
        }

        return parsedName;
    }
});
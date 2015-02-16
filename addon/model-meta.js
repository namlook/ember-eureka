
import Ember from 'ember';
import FieldMeta from './field-meta';
import endsWith from './utils/ends-with';

export default Ember.ObjectProxy.extend({
    modelType: null,
    store: null,

    fieldNames: function() {
        return Ember.keys(this.get('properties'));
    }.property('modelType'),

    relationFieldNames: function() {
        var results = Ember.A();
        var that = this;
        this.get('fieldNames').forEach(function(fieldName) {
            if (that.get(fieldName+'Field.isRelation')) {
                results.pushObject(fieldName);
            }
        });
        return results;
    }.property('fieldNames'),

    unknownProperty: function(key) {
        /*
         * If a property name ends with 'Field', then the ModelField
         * object is returned. This is useful if we're looking for the
         * field informations like schema or model relations.
         */
        if (endsWith(key, "Field")){
            var fieldName = key.slice(0, key.length - "Field".length);
            if (this.get('properties.'+fieldName)) {
                return FieldMeta.create({
                    name: fieldName,
                    modelMeta: this
                });
            }
        }

        /*
         * If a property name ends with 'EmberPath', then the corresponding
         * route name is returned. This is useful when using link-to.
         * The following example will create a link to 'user.model.index
         * (assuming the model is a user) :
         *
         *    {{#link-to model.meta.modelIndexEmberPath}}list{{/link-to}}
         *
         * blogPostModel.meta.collectionFavoritesEmberPath will return:
         *    'blog-post.collection.favorites'
         */
        if (endsWith(key, "EmberPath")){
            var emberPath = key.slice(0, key.length - "EmberPath".length);
            var dasherizedModelType = this.get('modelType').dasherize();
            emberPath = dasherizedModelType+'.'+emberPath.decamelize().split('_').join('.');
            return emberPath;
        }
        return this.get('content.'+key);
    }
});
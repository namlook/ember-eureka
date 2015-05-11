import Ember from 'ember';
import layout from '../templates/components/relation-autosuggest';

/** relation-autosuggest
 *  Usage:
 *
 *      {{relation-autosuggest field=field}}
 *
 */
export default Ember.Component.extend({
    layout: layout,
    tagName: 'span',

    field: null,

    fieldMeta: Ember.computed.alias('field.meta'),
    fieldType: Ember.computed.alias('fieldMeta.type'),

    relationModelMeta: Ember.computed('fieldType', function() {
        var fieldType = this.get('fieldType');
        var db = this.get('fieldMeta.modelMeta.store.db');
        return db[fieldType].get('modelMeta');
    }),

    autosuggestDisabled: Ember.computed('fieldMeta.autosuggest', function() {
        return this.get('fieldMeta.autosuggest') === false;
    }),

    searchProperty: Ember.computed('fieldMeta.autoSuggest.searchProperty', function() {
        return this.get('fieldMeta.autoSuggest.searchProperty') || 'title';
    }),

    displayProperty: Ember.computed('fieldMeta.autoSuggest.displayProperty', function() {
        return this.get('fieldMeta.autoSuggest.displayProperty') || 'title';
    }),

    store: Ember.computed.alias('relationModelMeta.store'),

    /*** relation related stuff ***/
    url: Ember.computed.alias('store.resourceEndpoint'),

    /** Build the query from the term
     *
     * The query can be forge from the field meta. For instance, if
     * we want to search from the login property:
     *
     *  author: {
     *       type: 'Author',
     *       autosuggest: {
     *          searchProperty: 'title',
     *          displayProperty: 'title'
     *          // query: 'login': 'namlook'
     *       }
     *   }
     *
     */
    select2QueryParametersFn: Ember.computed('searchProperty', 'relationModelMeta', function(params) {
        var searchProperty = this.get('searchProperty');
        var isText = this.get('relationModelMeta.'+searchProperty+'Field.isText');

        return function(params) {
            var queryParameters = {};
            if (params.term) {
                if (isText) {
                    queryParameters[searchProperty+"[$iregex]"] = '^'+params.term;
                } else {
                    queryParameters[searchProperty] = params.term;
                }
            }
            return queryParameters;
        };
    }),

    /** process the results **/
    select2ProcessResultsFn: Ember.computed('displayProperty', function(data) {
        var displayProperty = this.get('displayProperty');

        return function(data) {
            var results = data.results.map(function(item) {
                return {id: item._id, text: item[displayProperty]};
            });
            return {results: results};
        };
    }),

    _observeValue: Ember.observer('value', function() {
        var recordId = this.get('value');
        if (recordId) {
            var record = this.get('store').first({_id: recordId});
            var field = this.get('field');
            var isMulti = this.get('fieldMeta.isMulti');
            if (isMulti) {
                field.get('values').pushObject(record);
                // this.clearInput();
            } else {
                field.set('value', record);
            }
            this.set('value', null);
        }
    }),


    placeholder: Ember.computed('fieldType', function() {
        return "search a " + this.get('fieldType');
    }),
});

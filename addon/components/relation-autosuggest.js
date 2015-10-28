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

    isRelationSuggestionsLoading: false,

    relationSuggestions: Ember.computed(function() {
        return Ember.A();
    }),

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
    loadRelationSuggestions: Ember.on('init', Ember.observer('searchTerm', 'store', function() {
        let searchTerm = this.get('searchTerm');
        let store = this.get('store');

        let searchProperty = this.get('searchProperty');
        let isText = this.get(`relationModelMeta.${searchProperty}Field.isText`);
        let queryParameters = {};

        if (store) {
            this.set('isRelationSuggestionsLoading', true);

            if (isText) {
                queryParameters[`${searchProperty}[$irefex]`] = `^${searchTerm}`;
            } else {
                queryParameters[searchProperty] = searchTerm;
            }

            let displayProperty = this.get('displayProperty');
            store.find({filter: {title: {$iregex: searchTerm}}}).then((data) => {
                let results = data.map((item) => {
                    return {id: item.content._id, label: item.content[displayProperty]};
                });
                this.set('isRelationSuggestionsLoading', false);
                this.set('relationSuggestions', results);
            });
        }
    })),

    actions: {
        relationSearchFilter(searchTerm) {
            this.set('searchTerm', searchTerm);
        }
    },

    _observeValue: Ember.observer('value', function() {
        var recordId = this.get('value');
        if (recordId) {
            var record = this.get('store').fetch(recordId);
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

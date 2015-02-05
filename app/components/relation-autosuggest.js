import TypeaheadInput from 'ember-typeahead-input';


/** The TypeaheadInput component takes its configuration
 * from the structure:
 *
 *   properties: {
 *       <fieldName>: {
 *           type: <theFieldType>,
 *           autoSuggest: {
 *               query: "fieldName=%QUERY"
 *               searchKey: <fieldName>, // default to "title"
 *               displayKey: <fieldToDisplay> // default to "title"
 *           }
 *       }
 *   }
 *
 * if `query` is undefined, it will be built from `searchKey`
 * with the following algorithm:
 *
 *   - if the field type targeted by `searchKey` is a text,
 *     then use "<searchKey>[$iregex]=%QUERY"
 *   - else use "<searchKey>=%QUERY"
 */
export default TypeaheadInput.extend({

    /** TypeaheadInput attributes **/

    url: function() {
        var query = this.get('query');
        var resourceEndpoint = this.get('relationMeta.store.resourceEndpoint');
        return resourceEndpoint+'?'+query;
    }.property('relationMeta.store.resourceEndpoint', 'query'),


    placeholder: function() {
        return "search a " + this.get('fieldType');
    }.property('fieldType'),


    filterData: function(data) {
        return data.results;
    },


    displayKey: function() {
        return this.get('fieldMeta.autoSuggest.displayKey') || 'title';
    }.property('fieldMeta.autoSuggest.displayKey'),


    focusOut: function() {
        this.clearInput();
    },

    /** RelationAutosuggest stuff **/
    field: null,


    fieldMeta: function() {
        return this.get('field.meta');
    }.property('field.meta'),


    fieldType: function() {
        return this.get('fieldMeta.type');
    }.property('fieldMeta.type'),


    searchKey: function() {
        return this.get('fieldMeta.autoSuggest.searchKey') || 'title';
    }.property('fieldMeta.autoSuggest.searchKey'),


    /** the (model) meta informations from the relation type
     */
    relationMeta: function() {
        var fieldType = this.get('fieldType');
        var db = this.get('fieldMeta.modelMeta.store.db');
        return db[fieldType].get('modelMeta');
    }.property('fieldType'),


    /** the (field) meta information from `autoSuggest.searchKey`
     *
     *  author: {
     *      type: 'Author'
     *      autoSuggest: {searchKey: 'name'}
     *  }
     */
    searchKeyMeta: function() {
        var searchKey = this.get('searchKey');
        return this.get('relationMeta.'+searchKey+'Field');
    }.property('relationMeta', 'searchKey'),


    /** the query passed to the typeahead. it should take the form like
     *  ...=%QUERY
     *
     *  author: {
     *      type: 'Author',
     *      autoSuggest: {query: 'login=@%QUERY'}
     *  }
     *
     *  -> /api/endpoint?login=@namlook
     *
     */
    query: function() {
        var _query = this.get('fieldMeta.autoSuggest.query');
        if (!_query) {
            var searchKey = this.get('searchKey');
            if (this.get('searchKeyMeta.isText')) {
                _query = '[$iregex]=^%QUERY';
            } else {
                _query = '=%QUERY';
            }
            _query = searchKey+_query;
        }
        return _query;
    }.property('searchKey', 'fieldMeta.autoSuggest.query', 'searchKeyMeta.isText'),


    _onSelection: function() {
        var selection = this.get('selection');
        var field = this.get('field');
        var record = this.get('relationMeta.store').first({_id: selection.get('_id')});
        var isMulti = this.get('fieldMeta.isMulti');
        if (isMulti) {
            field.get('values').pushObject(record);
            this.clearInput();
        } else {
            field.set('value', record);
        }
    }.observes('selection'),

});

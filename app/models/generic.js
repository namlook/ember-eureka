
import Ember from 'ember';
import endsWith from 'ember-eureka/utils/ends-with';
import Field from 'ember-eureka/field';
import MultiField from 'ember-eureka/multi-field';

export default Ember.ObjectProxy.extend({

    /** This variable is incremented by the fields each time
     * their value has changed. This is used to update the model
     * content when saving it
     */
    _contentChanges: Ember.computed(function() {
        return Ember.Object.create({
            fieldName: null,
            value: null,
            count: 0
        });
    }),

    _resetContentChanges: function() {
        this.set('_contentChanges.count', 0);
        this.set('_contentChanges.fieldName', null);
        this.set('_contentChanges.value', null);
    },


    /** returns the number of changes of the content
     */
    _hasChanged: Ember.computed.alias('_contentChanges.count'),


    /** returns true if the object is has a footprint on a database
     * (ie has an _id) and its content has changed
     */
    _syncNeeded: function() {
        return this.get('_hasChanged') && !!this.get('content._id');
    }.property('_hasChanged', 'content._id'),


    /** update the value of a field.
     * This method trigger the `_contentChanges.count` attribute.
     * In order to track the model's content changes, make sure
     * you are using this method to set a field's value.
     *
     * Note that you can set the value directly via the computed
     * property ; so the following two examples are equal:
     *
     *   blogPost.setField('author', 'Namlook');
     *
     *   blogPost.set('author', 'Namlook');
     */
    setField: function(fieldName, value) {
        this.set('content.'+fieldName, value);
        this.set('_contentChanges.fieldName', fieldName);
        this.set('_contentChanges.value', value);
        this.incrementProperty('_contentChanges.count');
    },


    _initialContent: null,

    /** Store the original content so we can rollback the
     * changes later
     */
    _fillInitialContent: function() {

        var content;
        try {
            content = Ember.copy(this.get('content'), true);
        } catch (e) {
            content = {};
        }
        this.set('_initialContent', content);
    }.on('init'),


    /** this attribute is used to force `_fields` to reload
     * it is triggered via the '_triggerReloadFields' method
     */
    _reloadFields: 0,

    _triggerReloadFields: function() {
        this.incrementProperty('_reloadFields');
    },


    /** store ui related values used in templates
     */
    _ui: Ember.computed(function() {
        return Ember.create(null);
    }),

    /** build the fields list from the meta informations
     * This computed property watches the `_reloadFields` attribute
     * instead of the `_contentChange.count` so it prevent the
     * reloading to append too often
     */
    _fields: function() {
        var results = Ember.A();
        var that = this;
        this.get('meta.fieldNames').forEach(function(fieldTitle) {
            results.pushObject(that.get(fieldTitle+'Field'));
        });
        return results;
    }.property('meta.modelType', '_reloadFields'),


    title: function() {
        return this.get('content.title') || this.get('content._id');
    }.property('content.title', 'content._id'),


    delete: function() {
        // TODO
    },


    save: function() {
        this._resetContentChanges();
        this._fillInitialContent();
        var pojo = this.toPojo();
        return this.get('meta.store').sync(pojo);
    },

    toPojo: function() {
        var pojo = {};
        if (this.get('_id')) {
            pojo._id = this.get('_id');
            pojo._type = this.get('_type');
        }
        var pojos;
        var fieldMeta, isRelation, isMulti, contentValue;

        // force to update the content from the fields' values
        // this._updateContent();

        // iterate over each content attributes and get the pojo
        // from each relations
        var that = this;
        this.get('meta.fieldNames').forEach(function(fieldName) {
            fieldMeta = that.get('meta.'+fieldName+'Field');
            isRelation = fieldMeta.get('isRelation');
            isMulti = fieldMeta.get('isMulti');
            contentValue = that.get('content.'+fieldName);

            if (isRelation && contentValue) {

                // multi-relation
                if (isMulti) {
                    pojos = [];
                    contentValue.forEach(function(relation) {

                        // deal with PromiseProxy objects
                        if (Ember.get(relation, 'promise')) {
                            relation = relation.get('content');
                        }

                        if (relation.toPojo !== undefined) {
                            if (Ember.get(relation, '_id')) {
                                pojos.push({
                                    _id: relation.get('_id'),
                                    _type: relation.get('_type')
                                });
                            } else {
                                pojos.push(relation.toPojo());
                            }
                        } else {
                            pojos.push(relation);
                        }
                    });
                    pojo[fieldName] = pojos;

                } else { // single-relation

                    // deal with PromiseProxy objects
                    if (Ember.get(contentValue, 'promise')) {
                        contentValue = contentValue.get('content');
                    }

                    if (contentValue.toPojo !== undefined) {
                        pojo[fieldName] = contentValue.toPojo();
                    } else {
                        pojo[fieldName] = contentValue;
                    }
                }

            } else { // regular value
                pojo[fieldName] = contentValue;
            }
        });
        return pojo;
    },


    /** reload the object to it's previous state
     * usually, the first state is the content passed by `createRecord`
     */
    rollback: function() {
        var initialContent = this.get('_initialContent');
        var that = this;
        var oldValue;
        this.get('meta.fieldNames').forEach(function(fieldTitle) {
            oldValue = Ember.copy(initialContent[fieldTitle], true);
            that.set('content.'+fieldTitle, oldValue);
        });
        this._resetContentChanges();
        // this._triggerReloadFields();
    },


    unknownProperty: function(key) {
        /*
         * If a property name ends with 'Field', then the ModelField
         * object is returned. This is useful if we're looking for the
         * field informations like schema or model relations.
         */
        if (endsWith(key, "Field")){
            var fieldTitle = key.slice(0, key.length - "Field".length);
            var fieldMeta = this.get('meta.'+fieldTitle+'Field');

            if (fieldMeta.get('isMulti')) {
                var values;
                if (fieldMeta.get('isRelation') || !this.get(fieldTitle)) {
                    values = this.get(fieldTitle);
                } else {
                    values = this.get(fieldTitle).map(function(value) {
                        return Ember.Object.create({value: value});
                    });
                }
                return MultiField.create({
                    model: this,
                    meta: fieldMeta,
                    values: values
                });
            } else {
                return Field.create({
                    model: this,
                    meta: fieldMeta,
                    value: this.get(fieldTitle)
                });
            }
        }
        return this.get('content.'+key);
    }

});

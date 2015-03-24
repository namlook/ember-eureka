
import Ember from 'ember';
import endsWith from 'ember-eureka/utils/ends-with';
import Field from 'ember-eureka/field';
import MultiField from 'ember-eureka/multi-field';

export default Ember.ObjectProxy.extend({

    _init: function() {
        this.set('__scheduledFn', Ember.A());
    }.on('init'),

    /** schedule a function when a specific action will be run
     *
     * action: the action performed (ex: 'save')
     * name: the name of the scheduled action (ex: 'uploadFile')
     * scheduledFn: the javascript function to be scheduled. This
     *    function should return a promise.
     *
     */
    _scheduleFor: function(action, name, scheduledFn) {
        var scheduled = Ember.Object.create({
            action: action,
            name: name,
            scheduledFn: scheduledFn
        });
        this.get('__scheduledFn').pushObject(scheduled);
    },

    /** remove a scheduled action **/
    _removeScheduledFor: function(action, name) {
        var scheduledFn = this.get('__scheduledFn');
        var scheduledToRemove = scheduledFn.filter(function(object){
            if (object.get('action') === action && object.get('name') === name) {
                return object;
            }
        });
        scheduledFn.removeObjects(scheduledToRemove);
    },

    /** process all scheduled function for a specific action **/
    _processScheduledFor: function(action) {
        var scheduledFn = this.get('__scheduledFn');
        var scheduledToProcess = scheduledFn.filterBy('action', action);
        var promises = Ember.RSVP.all(scheduledToProcess.invoke('scheduledFn'));
        scheduledFn.removeObjects(scheduledToProcess);
        return promises;
    },

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
        var initContent = JSON.parse(JSON.stringify(this.toPojo()));
        this.set('_initialContent', initContent);
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
    }.property('meta.resource', '_reloadFields'),


    /** the title computed property is a little special,
     *  it is used to represent each model of the system.
     *  So it will return the title from the `content`, or
     *  the value of the field specified in `aliases.properties.title`,
     *  or the _id of the model
     */
    title: function(key, value) {

        // getter
        if (arguments.length === 1) {
            var _title;

            /** check if an alias exists for `title` in the structure
             *  if yes, then use the fieldName set for the title value
             */
            var alias = this.get('meta.aliases.properties.title');
            if (alias) {
                _title = this.get(alias);
            }
            return _title || this.get('content.title') || this.get('content._id');

        /* setter only if `title` is defined in structure
         * we don't need to handle aliases in setter (we have to set
         * the correct field(s) instead)
         */
        } else if (this.get('meta.titleField')) {
            this.setField('title', value);
            return value;
        }
    }.property('meta.aliases.properties.title', 'content.title', 'content._id'),


    delete: function() {
        return this.get('meta.store').delete(this.get('_id'));
    },


    save: function() {
        var that = this;
        return this._processScheduledFor('save').then(function() {
            var pojo = that.toPojo();
            return that.get('meta.store').sync(pojo);
        }).then(function(savedModel) {
            that._resetContentChanges();
            that._fillInitialContent();
            return savedModel;
        });
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
        this.get('meta.fieldNames').forEach(function(fieldName) {
            oldValue = Ember.copy(initialContent[fieldName], true);
            that.set('content.'+fieldName, oldValue);
        });
        this._resetContentChanges();
        this._triggerReloadFields();
    },


    unknownProperty: function(key) {
        /*
         * If a property name ends with 'Field', then the ModelField
         * object is returned. This is useful if we're looking for the
         * field informations like schema or model relations.
         */
        if (endsWith(key, "Field")){
            var fieldName = key.slice(0, key.length - "Field".length);
            var fieldMeta = this.get('meta.'+fieldName+'Field');

            if (!fieldMeta) {
                console.error('Eureka: unknown field', fieldName, 'in', this.get('meta.resource'));
            }

            if (fieldMeta.get('isMulti')) {
                var values;
                if (fieldMeta.get('isRelation') || !this.get(fieldName)) {
                    values = this.get(fieldName);
                } else {
                    values = this.get(fieldName).map(function(value) {
                        return Ember.Object.create({meta: fieldMeta, value: value});
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
                    value: this.get(fieldName)
                });
            }
        }
        // XXX handle aliases
        return this.get('content.'+key);
    }

});

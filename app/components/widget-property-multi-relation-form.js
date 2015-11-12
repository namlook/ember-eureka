import WidgetProperty from 'ember-eureka/widget-property';
import Ember from 'ember';

export default WidgetProperty.extend({

    editing: false,

    autosuggestDisabled: Ember.computed('field.meta.autosuggest', function() {
        return this.get('field.meta.autosuggest') === false;
    }),

    toggleEditionMode: function(relation) {
        relation.toggleProperty('_ui.editing', true);
    },

    actions: {
        edit: function(relation) {
            this.toggleEditionMode(relation);
        },
        addRelations: function() {
            var field = this.get('field');
            var db = field.get('meta.modelMeta.store.db');
            var relationType = field.get('meta.type');
            var relation = db[relationType].createRecord();
            this.toggleEditionMode(relation);
            field.get('values').pushObject(relation);
        },
        deleteRelations: function(relation) {
            this.get('field.values').removeObject(relation);
        },
        cancelRelations: function(relation) {
            relation.rollback();
            this.get('field.values').removeObject(relation);
            this.toggleEditionMode(relation);
        },
        doneRelations: function(relation) {
             if (relation.get('_syncNeeded')) {
                var that = this;
                relation.save().then(function(savedRelation) {
                    that.toggleEditionMode(relation);
                    that.get('field.values').removeObject(relation);
                    that.get('field.values').pushObject(savedRelation);
                });
            } else {
                if (!relation.get('_id')) {
                    this.get('field.values').removeObject(relation);
                }
                this.toggleEditionMode(relation);
            }
        }
    }
});
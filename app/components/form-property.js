import Property from 'ember-eureka/property';
import isEmpty from 'ember-eureka/utils/is-empty';

export default Property.extend({
    field: null,
    editing: false,

    toggleEditionMode: function(relation) {
        if (relation) {
            relation.toggleProperty('_ui.editing', true);
        } else {
            this.toggleProperty('field.editing', true);
        }
    },

    actions: {
        edit: function(relation) {
            this.toggleEditionMode(relation);
        },
        addRelation: function() {
            var field = this.get('field');
            var db = field.get('meta.modelMeta.store.db');
            var relationType = field.get('meta.type');
            var relation = db[relationType].createRecord();
            field.set('value', relation);
            this.toggleEditionMode();
        },
        addRelations: function() {
            var field = this.get('field');
            var db = field.get('meta.modelMeta.store.db');
            var relationType = field.get('meta.type');
            var relation = db[relationType].createRecord();
            this.toggleEditionMode(relation);
            field.get('values').pushObject(relation);
        },
        deleteRelation: function() {
            this.set('field.value', null);
        },
        deleteRelations: function(relation) {
            this.get('field.values').removeObject(relation);
        },
        cancelRelation: function() {
            var field = this.get('field');
            if (field.get('value.promise') !== undefined) {
                this.get('field.value.content').rollback(); // it's a proxy-promise
            } else {
                this.get('field.value').rollback();
            }
            this.toggleEditionMode();
        },
        cancelRelations: function(relation) {
            relation.rollback();
            this.toggleEditionMode(relation);
        },
        doneRelation: function() {
            var field = this.get('field');
            var relation;

            if (field.get('value.promise') !== undefined) {
                relation = field.get('value.content');  // it's a proxy-promise
            } else {
                relation = field.get('value');
            }

            var relationContent = relation.get('content');
            if (isEmpty(relationContent)) {
                field.set('value', null);
            } else if (relation.get('_syncNeeded')) {
                relation.save();
                console.log('relation saved!');
            }
            this.toggleEditionMode();
        },
        doneRelations: function(relation) {
            this.toggleEditionMode(relation);

            var relationContent = relation.get('content');
            if (isEmpty(relationContent)) {
                this.get('field.values').removeObject(relation);
            } else if (relation.get('_syncNeeded')) {
                relation.save();
                console.log('relation saved!');
            }
        },
        addValue: function() {
            var field = this.get('field');
            field.get('values').pushObject({value: null});
        },

        removeValue: function(value) {
            var field = this.get('field');
            field.get('values').removeObject(value);
        }
    }
});

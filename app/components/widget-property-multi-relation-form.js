import WidgetProperty from 'ember-eureka/widget-property';
import isEmpty from 'ember-eureka/utils/is-empty';

export default WidgetProperty.extend({

    editing: false,

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
            this.toggleEditionMode(relation);
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
        }
    }
});
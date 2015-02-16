import WidgetProperty from 'ember-eureka/widget-property';
import isEmpty from 'ember-eureka/utils/is-empty';

export default WidgetProperty.extend({

    editing: false,

    toggleEditionMode: function() {
        this.toggleProperty('field.editing', true);
    },

    actions: {
        edit: function() {
            this.toggleEditionMode();
        },
        addRelation: function() {
            var field = this.get('field');
            var db = field.get('meta.modelMeta.store.db');
            var relationType = field.get('meta.type');
            var relation = db[relationType].createRecord();
            field.set('value', relation);
            this.toggleEditionMode();
        },
        deleteRelation: function() {
            this.set('field.value', null);
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
        cancelRelation: function() {
            var field = this.get('field');
            if (field.get('value.promise') !== undefined) {
                this.get('field.value.content').rollback(); // it's a proxy-promise
            } else {
                this.get('field.value').rollback();
            }
            this.toggleEditionMode();
        }
    }

});

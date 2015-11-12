import Route from 'ember-eureka/route';

/** This route is used for nested form (or step wizards)
 *
 *  /new/user-infos
 *  /new/contacts
 *  /new/done
 */

export default Route.extend({

    model: function() {
        var resourceRoute = this.get('fqvn').split('.new.')[0] + '.new';
        return this.modelFor(resourceRoute);
    },

    actions: {
        refreshModel: function() { // XXX only used by model-form
            // this.refresh();
            return true; // bubble up to the model route
        }
    }

});
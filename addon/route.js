import Ember from 'ember';

export default Ember.Route.extend({

    modelType: function() {
        return this.get('routeName').split('.')[0].camelize().capitalize();
    }.property('routeName'),

    store: function() {
        var modelType = this.get('modelType');
        return this.db[modelType];
    }.property('modelType'),

    name: function() {
        return this.toString().split(':')[1].split('/').join('.');
    }.property(),

    routeType: function() {
        return this.get('name').split('.')[1];
    }.property('name'),

    renderTemplate: function() {
        this._super(this, arguments);

        // if the template doesn't exists, we render the generic template
        if (!this.container.resolve('template:'+path)) {

            var routeType = this.get('routeType');
            var dasherizedModelType = this.get('modelType').dasherize();
            var path = this.get('name').split('.').join('/');

            this.render('_widgets', {                     // render the template '_widgets'
                into: dasherizedModelType+'.'+routeType,  // into this template (ex: `user.collection`)
                // outlet: 'widgets',                     // the name of the outlet in that template
                controller: path                          // the controller to use for the template
            });
        }
    }
});
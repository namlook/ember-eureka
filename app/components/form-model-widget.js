import ModelWidget from 'ember-eureka/model-widget';

export default ModelWidget.extend({

    /** if false, display the save button
     */
    isEmbedded: false,

    model: function() {
        return this.get('routeModel');
    }.property('routeModel'),

    actions: {
        save: function() {
            var model = this.get('model');
            model.save().then(function(m) {
                console.log('saaaaaved', m.get('_id'));
                // TODO send action to controller for transition
            });
        }
    },

    _focusOnFirstElement: function() {
        this.$('input:eq(0)').focus();
    }.on('didInsertElement'),

    _focusOnNextElement: function() {
        // XXX check li
        this.$().closest('li').next().find('input').focus();
    }.on('willDestroyElement')
});

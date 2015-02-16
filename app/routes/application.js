import Ember from 'ember';

export default Ember.Route.extend({

    // modelTypeList: function() {
    //     return Ember.keys(Ember.get(this.config, 'structure.models'));
    // }.property(),

    model: function() {
        return {};
        // var results = Ember.A();
        // var modelInfo;
        // this.get('modelTypeList').forEach(function(modelType) {
        //     modelInfo = Ember.Object.create({
        //         modelType: modelType,
        //         route: modelType.dasherize()
        //     });
        //     results.pushObject(modelInfo);
        // });
        // return results;
    }
});


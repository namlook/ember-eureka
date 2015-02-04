import Ember from 'ember';
export default function isEmpty(obj) {
    if (Ember.keys(obj).length === 0) {
        return true;
    }
    return Ember.isEmpty(obj);
}

import Ember from 'ember';

/** Interpolate a string. Example:
 *
 *     > a = "{name} has {age}";
 *     > stringInterpolate(a, {name: 'Bob', age: 21});
 *
 */
export default function stringInterpolate(string, obj) {
    return string.replace(/{([^{}]*)}/g,
        function (a, b) {
            return Ember.get(obj, b);
        }
    );
};
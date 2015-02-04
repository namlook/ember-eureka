
/** A database is a singleton in which multiple stores are attached
 * (one store by model type)
 */

import Ember from 'ember';

export default Ember.Object.extend({
    endpoint: null
});
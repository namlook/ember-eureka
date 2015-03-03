
/** A database is a singleton in which multiple stores are attached
 * (one store by resource)
 */

import Ember from 'ember';

export default Ember.Object.extend({
    endpoint: null
});
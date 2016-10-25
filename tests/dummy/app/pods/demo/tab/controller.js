import Ember from 'ember'

// BEGIN-SNIPPET frost-tab-controller
export default Ember.Controller.extend({
  actions: {
    onChange (tabId) {
      this.set('selectedTab', tabId)
    }
  }
})
// END-SNIPPET

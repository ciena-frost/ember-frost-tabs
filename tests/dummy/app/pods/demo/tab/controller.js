import Ember from 'ember'

// BEGIN-SNIPPET frost-tab-controller
export default Ember.Controller.extend({
  actions: {
    onChange (tabId) {
      console.log(`Selected tab: ${tabId}`)
    }
  }
})
// END-SNIPPET

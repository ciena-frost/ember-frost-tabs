import Ember from 'ember'

// BEGIN-SNIPPET frost-tabs-controller
export default Ember.Controller.extend({
  selectedTab: 'template',
  actions: {
    onChange (tabId) {
      console.log(`Selected tab: ${tabId}`)
    }
  }
})
// END-SNIPPET

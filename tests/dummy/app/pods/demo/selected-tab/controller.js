import Ember from 'ember'

// BEGIN-SNIPPET selected-tab-controller
export default Ember.Controller.extend({
  selectedTab: 'route',
  actions: {
    onChange (tabId) {
      console.log(`Selected tab: ${tabId}`)
    }
  }
})
// END-SNIPPET

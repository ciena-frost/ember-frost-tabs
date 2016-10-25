import Ember from 'ember'

// BEGIN-SNIPPET selected-tab-controller
export default Ember.Controller.extend({
  selectedTab: 'route',
  actions: {
    onChange (tabId) {
      this.set('selectedTab', tabId)
    }
  }
})
// END-SNIPPET

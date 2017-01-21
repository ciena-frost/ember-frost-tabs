import Ember from 'ember'
const {Controller} = Ember

// BEGIN-SNIPPET selected-tab-controller
export default Controller.extend({
  selectedTab: 'route',
  actions: {
    onChange (tabId) {
      this.set('selectedTab', tabId)
    }
  }
})
// END-SNIPPET

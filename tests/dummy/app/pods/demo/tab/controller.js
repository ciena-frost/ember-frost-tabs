import Ember from 'ember'
const {Controller} = Ember

// BEGIN-SNIPPET frost-tab-controller
export default Controller.extend({
  actions: {
    onChange (tabId) {
      this.set('selectedTab', tabId)
    }
  }
})
// END-SNIPPET

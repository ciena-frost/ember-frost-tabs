import Ember from 'ember'
const {Controller} = Ember

// BEGIN-SNIPPET frost-tabs-controller
export default Controller.extend({
  selectedTab: undefined,
  actions: {
    onChange (tabId) {
      this.set('selectedTab', tabId)
    }
  }
})
// END-SNIPPET

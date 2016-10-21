import Ember from 'ember'

export default Ember.Controller.extend({
  selectedTab: 'template',
  actions: {
    onChange (tabId) {
      console.log(`Selected tab: ${tabId}`)
    }
  }
})

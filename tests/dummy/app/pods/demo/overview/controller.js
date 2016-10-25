import Ember from 'ember'

export default Ember.Controller.extend({
  selectedTab: 'template',
  actions: {
    onChange (tabId) {
      this.set('selectedTab', tabId)
    }
  }
})

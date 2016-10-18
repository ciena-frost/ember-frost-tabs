import Ember from 'ember'

export default Ember.Controller.extend({
  selectedTab: 'route',
  actions: {
    onChange (tabId) {
      this.set('selectedTab', tabId)
    }
  }
})

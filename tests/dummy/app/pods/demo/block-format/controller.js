import Ember from 'ember'

export default Ember.Controller.extend({
  options: [
    { id: 'a', title: 'A', text: 'A content' },
    { id: 'b', title: 'B', text: 'B content' },
    { id: 'c', title: 'C', text: 'C content' }
  ],
  selectedTab: 'b',

  actions: {
    onChange (tabId) {
      this.set('selectedTab', tabId)
    }
  }
})

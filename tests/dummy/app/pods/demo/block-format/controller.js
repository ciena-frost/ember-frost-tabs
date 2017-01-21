import Ember from 'ember'
const {Controller} = Ember

export default Controller.extend({
  options: [
    {id: 'a', title: 'A', text: 'A content'},
    {id: 'b', title: 'B', text: 'B content'},
    {id: 'c', title: 'C', text: 'C content'}
  ],
  selectedTab: 'b',

  actions: {
    onChange (tabId) {
      this.set('selectedTab', tabId)
    }
  }
})

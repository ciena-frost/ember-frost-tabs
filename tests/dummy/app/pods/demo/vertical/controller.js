import Ember from 'ember'
const {Controller} = Ember

export default Controller.extend({
  selectedTab: 'template',
  actions: {
    onChange (tabId) {
      this.set('selectedTab', tabId)
    }
  }
})

import Ember from 'ember'

export default Ember.Controller.extend({
  queryParams: ['selectedTab'],

  selectedTab: 'controller',

  actions: {
    tabSelected (tab) {
      this.set('selectedTab', tab)
    }
  }
})

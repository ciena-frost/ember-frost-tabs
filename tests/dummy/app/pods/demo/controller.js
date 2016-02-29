import Ember from 'ember'

export default Ember.Controller.extend({
  queryParams: ['selectedTab'],

  selectedTab: 'controller',

  actions: {
    demoTabSelected (tab) {
      this.set('demoTabSelected', tab)
    }
  }
})

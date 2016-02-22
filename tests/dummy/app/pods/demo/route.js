import Ember from 'ember'

export default Ember.Route.extend({
  queryParams: {
    selectedTab: {
      as: 'tab'
    }
  }
})

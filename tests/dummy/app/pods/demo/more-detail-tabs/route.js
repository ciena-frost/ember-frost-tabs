import Ember from 'ember'

export default Ember.Route.extend({
  setupController (controller, model) {
    this._super(controller, model)

    if (!controller.get('selectedTab')) {
      controller.set('selectedTab', 'View')
    }
  }
})

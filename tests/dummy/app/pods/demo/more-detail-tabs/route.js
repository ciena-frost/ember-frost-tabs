import Ember from 'ember'
const {Route} = Ember

export default Route.extend({
  setupController (controller, model) {
    this._super(controller, model)

    if (!controller.get('selectedTab')) {
      controller.set('selectedTab', 'View')
    }
  }
})

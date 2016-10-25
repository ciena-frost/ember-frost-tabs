import Ember from 'ember'
import config from './config/environment'

var Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
})

Router.map(function () {
  this.route('demo', { path: '/' }, function () {
    this.route('overview', { path: '/' })
    // Building blocks
    this.route('content')
    this.route('selected-tab')
    this.route('disable-tab')
    // Tabs components
    this.route('tab')
    // Tests
    this.route('hook')
  })
})

export default Router

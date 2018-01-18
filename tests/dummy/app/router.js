import Ember from 'ember'
const {Router: EmberRouter} = Ember

import config from './config/environment'

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
})

Router.map(function () {
  this.route('demo', {path: '/'}, function () {
    this.route('overview', {path: '/'})
    // Building blocks
    this.route('content')
    this.route('selected-tab')
    this.route('disable-tab')
    // Tabs components
    this.route('tab')
    // Tests
    this.route('hook')
    this.route('block-format')
    this.route('more-detail-tabs')
    this.route('vertical')
  })
})

export default Router

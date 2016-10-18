import Ember from 'ember'
import layout from './template'
import { PropTypes } from 'ember-prop-types'

export default Ember.Component.extend({
  // == Component properties ==================================================

  layout: layout,
  classNames: ['frost-tabs'],

  // == State properties ======================================================

  propTypes: {
    tabs: PropTypes.array.isRequired,
    selectedTab: PropTypes.string,
    targetOutlet: PropTypes.string,
    onChange: PropTypes.func,
    hook: PropTypes.string
  },

  getDefaultProps () {
    return {
      targetOutlet: 'tab-content'
    }
  }
})

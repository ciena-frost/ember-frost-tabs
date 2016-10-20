import Ember from 'ember'
import layout from './template'
import PropTypesMixin, { PropTypes } from 'ember-prop-types'
import uuid from 'ember-simple-uuid'

export default Ember.Component.extend(PropTypesMixin, {
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
      targetOutlet: `frost-tab-content-${uuid()}`
    }
  }
})

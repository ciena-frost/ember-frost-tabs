import Ember from 'ember'
const {Component} = Ember
import layout from '../templates/components/frost-tabs'
import PropTypesMixin, {PropTypes} from 'ember-prop-types'
import uuid from 'ember-simple-uuid'

export default Component.extend(PropTypesMixin, {
  // == Component properties ==================================================

  layout: layout,
  classNames: ['frost-tabs'],

  // == State properties ======================================================

  propTypes: {
    tabs: PropTypes.array,
    selectedTab: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    hook: PropTypes.string.isRequired,
    targetOutlet: PropTypes.string
  },

  getDefaultProps () {
    return {
      targetOutlet: `frost-tab-content-${uuid()}`
    }
  }
})

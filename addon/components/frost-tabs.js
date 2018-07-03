import Ember from 'ember'
const {Component, guidFor} = Ember
import layout from '../templates/components/frost-tabs'
import PropTypesMixin, {PropTypes} from 'ember-prop-types'

export default Component.extend(PropTypesMixin, {
  // == Component properties ==================================================

  layout: layout,
  classNames: ['frost-tabs'],
  classNameBindings: ['design'],
  tabComponent: '../components/frost-tab',

  // == State properties ======================================================

  propTypes: {
    design: PropTypes.string,
    tabs: PropTypes.array,
    selectedTab: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    hook: PropTypes.string.isRequired,
    targetOutlet: PropTypes.string
  },

  getDefaultProps () {
    return {
      design: 'horizontal',
      targetOutlet: `frost-tab-content-${guidFor({})}`
    }
  }
})

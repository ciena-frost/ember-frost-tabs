import Ember from 'ember'
import layout from './template'
import PropTypesMixin, { PropTypes } from 'ember-prop-types'

const {
  Component,
  computed
} = Ember

export default Component.extend(PropTypesMixin, {
  // == Component properties ==================================================

  layout: layout,
  classNames: ['frost-tab'],

  // == State properties ======================================================

  propTypes: {
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    content: PropTypes.oneOfType([
      PropTypes.EmberObject,
      PropTypes.object
    ]).isRequired,
    disabled: PropTypes.bool,
    // Set by the parent component
    hook: PropTypes.string,
    parentHook: PropTypes.string,
    targetOutlet: PropTypes.string.isRequired,
    selectedTab: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
  },

  getDefaultProps () {
    return {
      disabled: false
    }
  },

  // == Computed properties ===================================================

  isSelected: computed('id', 'selectedTab', function () {
    return this.id === this.selectedTab && !this.disabled
  }),

  hook: computed('parentHook', 'id', function () {
    return `${this.parentHook}-${this.id}`
  }),

  // == Actions ===============================================================

  actions: {
    change () {
      if (this.onChange) {
        this.onChange(this.id)
      }
    }
  }
})

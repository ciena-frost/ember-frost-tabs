import Ember from 'ember'
import layout from './template'
// import FrostTabs from 'ember-frost-tabs/pods/components/frost-tabs/component'
import { PropTypes } from 'ember-prop-types'

const {
  Component
} = Ember

export default Component.extend({
  // == Component properties ==================================================

  layout: layout,
  classNames: ['frost-tab'],
  classNameBindings: ['tabClassNames'],

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
    targetOutlet: PropTypes.string.isRequired,
    selectedTab: PropTypes.string,
    onChange: PropTypes.func
  },

  getDefaultProps () {
    return {
      disabled: false
    }
  },

  // == Computed properties ===================================================

  isSelected: Ember.computed('id', 'selectedTab', function () {
    return this.id === this.selectedTab
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

// add visual acceptance tests
// try to see how I can use this addon in object details
// improve demo

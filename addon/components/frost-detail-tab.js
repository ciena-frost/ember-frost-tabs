/**
 * Component definition for the qp-tabs component
 */

import Ember from 'ember'
const {get, run} = Ember
import computed, {readOnly} from 'ember-computed-decorators'
import {Component} from 'ember-frost-core'
import {PropTypes} from 'ember-prop-types'

import layout from '../templates/components/frost-detail-tab'

export default Component.extend({

  // == Dependencies ==========================================================

  // == Keyword Properties ====================================================

  classNameBindings: ['_isInViewport::overflow', '_isSelected:selected'],
  layout,

  // == PropTypes =============================================================

  propTypes: {
    // Required
    register: PropTypes.func.isRequired,
    selectedTab: PropTypes.shape({
      id: PropTypes.any.isRequired,
      label: PropTypes.string.isRequired
    }),
    tab: PropTypes.shape({
      id: PropTypes.any.isRequired,
      label: PropTypes.string.isRequired
    }),
    viewport: PropTypes.EmberObject.isRequired,
    onSelect: PropTypes.func.isRequired,

    // State
    _isInserted: PropTypes.bool
  },

  getDefaultProps () {
    return {
      // State defaults
      _isInserted: false
    }
  },

  // == Computed Properties ===================================================

  @readOnly
  @computed('_isInserted', 'viewport.{scrollLeft,width}')
  _isInViewport (isInserted, viewportScrollLeft, viewportWidth) {
    // Can only be calculated after elements are in the DOM
    if (!isInserted || !viewportWidth) {
      return false
    }

    const tabLeft = this.$().position().left
    const tabWidth = this.$().outerWidth()
    // This is annoying, but the math appears to be slightly off, maybe because of the border
    // between the tabs - so we're dropping one off the tabLeft for the border.
    // Why the viewport needs another pixel for this to calculate correctly, I don't know...
    // TODO Find out why...
    return 0 <= tabLeft && Math.floor(tabLeft - 1 + tabWidth) <= viewportWidth + 1
  },

  @readOnly
  @computed('selectedTab')
  _isSelected (selectedTab) {
    if (!selectedTab) {
      return false
    }

    return this.get('tab.id') === get(selectedTab, 'id')
  },

  // == Functions =============================================================

  // == Tasks =================================================================

  // == DOM Events ============================================================

  click () {
    this.onSelect(this.get('tab.id'))
  },

  didInsertElement () {
    this.register({
      tabId: this.get('tab.id'),
      tabLeft: Math.floor(this.get('viewport.scrollLeft') + this.$().position().left),
      tabWidth: Math.floor(this.$().outerWidth())
    })

    run.schedule('sync', this, () => {
      // Unblock CP chains reliant on DOM sizing
      this.set('_isInserted', true)
    })
  }

  // == Lifecycle Hooks =======================================================

  // == Actions ===============================================================

})

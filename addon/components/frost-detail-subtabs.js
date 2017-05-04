/**
 * Component definition for the frost-detail-subtabs component
 */
import Ember from 'ember'
const {isEmpty, typeOf} = Ember
import computed, {readOnly} from 'ember-computed-decorators'
import {Component} from 'ember-frost-core'
import {PropTypes} from 'ember-prop-types'

import layout from '../templates/components/frost-detail-subtabs'

export default Component.extend({
  // == Dependencies ==========================================================

  // == Keyword Properties ====================================================

  layout,

  // == PropTypes =============================================================

  /**
   * Properties for this component. Options are expected to be (potentially)
   * passed in to the component. State properties are *not* expected to be
   * passed in/overwritten.
   */
  propTypes: {
    // options
    tabs: PropTypes.arrayOf(PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        id: PropTypes.any.isRequired,
        label: PropTypes.string.isRequired,
        pack: PropTypes.string.isRequired,
        icon: PropTypes.string.isRequired
      })
    ])).isRequired,
    selectedTab: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        id: PropTypes.any.isRequired,
        label: PropTypes.string.isRequired
      })
    ]),
    onSelect: PropTypes.func.isRequired
    // state
  },

  /** @returns {Object} the default property values when not provided by consumer */
  getDefaultProps () {
    return {
      // options

      // state
    }
  },

  // == Computed Properties ===================================================

  @readOnly
  @computed('tabs.[]')
  _tabs (tabs) {
    // Let PropTypes handle checking the format of objects passed in as tabs,
    // just assume they're in the right format here
    if (isEmpty(tabs) || typeOf(tabs[0]) === 'object' || typeOf(tabs[0]) === 'instance') {
      return tabs
    }

    // Map tab strings to an {id, label} hash
    return tabs.map(label => {
      return {
        id: label,
        label,
        icon: 'view-medium',
        pack: 'frost'
      }
    })
  },

  // == Functions =============================================================

  // == DOM Events ============================================================

  // == Lifecycle Hooks =======================================================

  // == Actions ===============================================================

  actions: {
  }
})

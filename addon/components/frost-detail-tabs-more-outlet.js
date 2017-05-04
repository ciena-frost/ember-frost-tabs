/**
 * Component definition for the qp-tabs-more-outlet component
 */

import {Component} from 'ember-frost-core'
import {PropTypes} from 'ember-prop-types'

import layout from './template'

export default Component.extend({

  // == Dependencies ==========================================================

  // == Keyword Properties ====================================================

  layout,
  tagName: '',

  // == PropTypes =============================================================

  propTypes: {
    // Options
    name: PropTypes.string
  },

  getDefaultProps () {
    return {
      // Option defaults
      name: 'qp-tabs-more'
    }
  }

  // == Computed Properties ===================================================

  // == Functions =============================================================

  // == DOM Events ============================================================

  // == Lifecycle Hooks =======================================================

  // == Actions ===============================================================

})

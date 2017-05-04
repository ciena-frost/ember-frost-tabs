/**
 * Component definition for the qp-tabs-more-outlet component
 */

import {Component} from 'ember-frost-core'
import {PropTypes} from 'ember-prop-types'

import layout from '../templates/components/frost-detail-tabs-more-outlet'

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
      name: 'frost-detail-tabs-more'
    }
  }

  // == Computed Properties ===================================================

  // == Functions =============================================================

  // == DOM Events ============================================================

  // == Lifecycle Hooks =======================================================

  // == Actions ===============================================================

})

/**
 * Component definition for the frost-detail-tab-actions component
 */

import {Component} from 'ember-frost-core'
import {PropTypes} from 'ember-prop-types'

import layout from '../templates/components/frost-detail-tab-actions'

export default Component.extend({

  // == Dependencies ==========================================================

  // == Keyword Properties ====================================================

  layout,

  // == PropTypes =============================================================

  propTypes: {
    tabActions: PropTypes.arrayOf(PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.EmberObject
    ])),
    onDispatch: PropTypes.func.isRequired
  },

  getDefaultProps () {
    return {}
  }

  // == Computed Properties ===================================================

  // == Functions =============================================================

  // == DOM Events ============================================================

  // == Lifecycle Hooks =======================================================

  // == Actions ===============================================================

})

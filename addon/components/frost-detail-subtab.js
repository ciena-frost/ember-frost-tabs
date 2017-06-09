/**
 * Component definition for the frost-detail-subtab component
 */
import Ember from 'ember'
const {get} = Ember
import computed, {readOnly} from 'ember-computed-decorators'
import {Component} from 'ember-frost-core'
import {PropTypes} from 'ember-prop-types'

import layout from '../templates/components/frost-detail-subtab'

export default Component.extend({
  // == Dependencies ==========================================================

  // == Keyword Properties ====================================================
  classNameBindings: ['_isSelected:selected'],
  layout,

  // == PropTypes =============================================================

  /**
   * Properties for this component. Options are expected to be (potentially)
   * passed in to the component. State properties are *not* expected to be
   * passed in/overwritten.
   */
  propTypes: {
    // options
    selectedSubtab: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
      PropTypes.EmberObject
    ]),
    subtab: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
      PropTypes.EmberObject
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
  @computed('selectedSubtab')
  _isSelected (selectedSubtab) {
    if (!selectedSubtab) {
      return false
    }

    return this.get('subtab.id') === get(selectedSubtab, 'id')
  },

  // == Functions =============================================================

  // == DOM Events ============================================================
  click () {
    this.onSelect(this.get('subtab.id'))
  },

  // == Lifecycle Hooks =======================================================

  // == Actions ===============================================================

  actions: {
  }
})

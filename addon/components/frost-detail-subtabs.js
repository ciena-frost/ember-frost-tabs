/**
 * Component definition for the frost-detail-subtabs component
 */
import Ember from 'ember'
const {Logger, isEmpty, typeOf} = Ember
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
    subtabs: PropTypes.arrayOf(PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
      PropTypes.EmberObject
    ])).isRequired,
    selectedSubTab: PropTypes.oneOfType([
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

  // If the sub-tab only provide the label string, map them into objects
  // with an id for consistency across the rest of the component.
  // The option to supply an id with a tab supports the use case where
  // a consumer wants a shorter id for the tabs than the label
  // (e.g. for binding to query params)
  @readOnly
  @computed('selectedSubtab')
  _selectedSubtab (selectedSubtab) {
    if (!selectedSubtab || typeOf(selectedSubtab) === 'object' || typeOf(selectedSubtab) === 'instance') {
      return {
        id: null,
        label: null
      }
    }

    const label = selectedSubtab
    return {
      id: label,
      label,
      icon: 'view-medium',
      pack: 'frost'
    }
  },

  @readOnly
  @computed('subtabs.[]')
  _subtabs (subtabs) {
    if (isEmpty(subtabs) || typeOf(subtabs[0]) === 'object' || typeOf(subtabs[0]) === 'instance') {
      const isMissingProperties = subtabs.some(({id, label, icon, pack}) => {
        return !id || !label
      })
      if (isMissingProperties) {
        Logger.error(`frost-detail-subtabs:
          Objects provided to the 'tabs' property must include an 'id', 'label', 'icon' and 'pack'`)
      }
      return subtabs
    }

    // Map tab strings to an {id, label} hash
    return subtabs.map(label => {
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

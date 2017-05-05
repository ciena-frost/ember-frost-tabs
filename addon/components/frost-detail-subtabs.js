/**
 * Component definition for the frost-detail-subtabs component
 */
import Ember from 'ember'
const {A, Logger, isEmpty, typeOf} = Ember
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
    selectedTab: PropTypes.oneOfType([
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
  @computed('subtabs.[]', 'selectedTab')
  _subtabs (subtabs, selectedTab) {
    // Let PropTypes handle checking the format of objects passed in as tabs,
    // just assume they're in the right format here
    if (isEmpty(selectedTab)) {
      return []
    }
    const selectedTabSubtabs = A(subtabs).findBy('tab', selectedTab)
    const subtabsContent = selectedTabSubtabs ? selectedTabSubtabs.content : []
    if (isEmpty(subtabsContent) || typeOf(subtabsContent[0]) === 'object' || typeOf(subtabsContent[0]) === 'instance') {
      // const isMissingProperties = subtabs.some(({id, label, icon, pack}) => {
      //   return !id || !label
      // })
      // if (isMissingProperties) {
      //   Logger.error(`frost-detail-subtabs:
      //     Objects provided to the 'tabs' property must include an 'id', 'label', 'icon' and 'pack'`)
      // }
      return subtabsContent
    }

    // Map tab strings to an {id, label} hash
    return subtabsContent.map(label => {
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

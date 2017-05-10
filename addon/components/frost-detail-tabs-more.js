/**
 * Component definition for the frost-detail-tabs-more component
 */

import Ember from 'ember'
const {A, Object: EmberObject, get, isEmpty, typeOf} = Ember
import computed, {readOnly} from 'ember-computed-decorators'
import {task, timeout} from 'ember-concurrency'
import {Component} from 'ember-frost-core'
import {PropTypes} from 'ember-prop-types'

import layout from '../templates/components/frost-detail-tabs-more'

const SCROLL_ANIMATION_DURATION = 100

export default Component.extend({

  // == Dependencies ==========================================================

  // == Keyword Properties ====================================================

  layout,
  tagName: '',

  // == PropTypes =============================================================

  propTypes: {
    // Required
    selectedTab: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        id: PropTypes.any.isRequired,
        label: PropTypes.string.isRequired
      })
    ]),
    tabs: PropTypes.arrayOf(PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
      PropTypes.EmberObject
    ])).isRequired,
    onSelect: PropTypes.func.isRequired,

    // Options
    label: PropTypes.string,
    targetOutlet: PropTypes.string,

    // State
    _viewport: PropTypes.EmberObject
  },

  getDefaultProps () {
    return {
      // Option defaults
      label: 'More details',
      targetOutlet: 'frost-detail-tabs-more',

      // State defaults
      _viewport: EmberObject.create({
        scrollLeft: 0,
        width: 10000
      })
    }
  },

  // == Computed Properties ===================================================

  // Wrap the label for the same reasons outlined in the comments for _tabs
  @readOnly
  @computed('label')
  _tab (label) {
    return {
      id: 'more',
      label
    }
  },

  // If the tabs only provide the label string, map them into objects
  // with an id for consistency across the rest of the component.
  // The option to supply an id with a tab supports the use case where
  // a consumer wants a shorter id for the tabs than the label
  // (e.g. for binding to query params)
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
        label
      }
    })
  },

  // == Functions =============================================================

  // == Tasks =================================================================

  // == DOM Events ============================================================

  // == Lifecycle Hooks =======================================================

  // == Actions ===============================================================

  actions: {
    _register () {
      // No-op (special case - the More tab isn't part of the overflow)
    }
  }

})

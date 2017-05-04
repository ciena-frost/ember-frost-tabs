/**
 * Component definition for the frost-detail-tabs-more-tabs component
 */

import Ember from 'ember'
const {get, isEmpty} = Ember
import computed, {readOnly} from 'ember-computed-decorators'
import {task, timeout} from 'ember-concurrency'
import {Component} from 'ember-frost-core'
import {PropTypes} from 'ember-prop-types'

import layout from '../templates/components/frost-detail-tabs-more-tabs'

export default Component.extend({

  // == Dependencies ==========================================================

  // == Keyword Properties ====================================================

  layout,

  // == PropTypes =============================================================

  propTypes: {
    // Required
    tabs: PropTypes.arrayOf(PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
      PropTypes.EmberObject
    ])).isRequired,
    onSelect: PropTypes.func.isRequired,

    // State
    _filter: PropTypes.string
  },

  getDefaultProps () {
    return {
      // State defaults
      _filter: ''
    }
  },

  // == Computed Properties ===================================================

  @readOnly
  @computed('_filter', '_tabs')
  _filteredTabs (filter, tabs) {
    return tabs.filter()
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
    }).filter(({id}) => {
      // Strip the 'More' tab out of the set of scrollable tabs
      return id !== 'more'
    })
  },

  // == Functions =============================================================

  // == Tasks =================================================================

  // Basic task to debounce/throttle filtering
  _updateViewportTask: task(function * (filter) {
    this.set('_filter', filter)
    yield timeout(1000 / 60)
  }).keepLatest(),

  // == DOM Events ============================================================

  // == Lifecycle Hooks =======================================================

  // == Actions ===============================================================

  actions: {
    _filterTabs (event) {
      this.get('_setFilter').perform(event.target.value)
    }
  }

})

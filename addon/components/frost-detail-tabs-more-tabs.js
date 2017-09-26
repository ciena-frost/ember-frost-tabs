/**
 * Component definition for the frost-detail-tabs-more-tabs component
 */

import Ember from 'ember'
const {isEmpty, typeOf} = Ember
import computed, {readOnly} from 'ember-computed-decorators'
import {task, timeout} from 'ember-concurrency'
import {Component} from 'ember-frost-core'
import {PropTypes} from 'ember-prop-types'

import layout from '../templates/components/frost-detail-tabs-more-tabs'

const COLUMN_WIDTH = 350

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
  @computed('_containerWidth', '_filteredTabs')
  _columns (containerWidth, filteredTabs) {
    if (!containerWidth || isEmpty(filteredTabs)) {
      return []
    }

    const numberOfColumns = Math.max(Math.floor(containerWidth / COLUMN_WIDTH), 1)
    const numberOfTabs = filteredTabs.length
    const tabsPerColumn = Math.floor(numberOfTabs / numberOfColumns)
    const leftoverTabs = numberOfTabs % numberOfColumns

    return Array.from(Array(numberOfColumns), (entry, index) => {
      const hasLeftoverTab = index < leftoverTabs
      const previousLeftoverTabs = index > 0 ? Math.min(index, leftoverTabs) : 0

      const sliceFromIndex = index * tabsPerColumn + previousLeftoverTabs
      const sliceToIndexInclusive = sliceFromIndex + tabsPerColumn + (hasLeftoverTab ? 1 : 0)
      return filteredTabs.slice(sliceFromIndex, sliceToIndexInclusive)
    })
  },

  @readOnly
  @computed('_filter', '_tabs')
  _filteredTabs (filter, tabs) {
    if (isEmpty(filter)) {
      return tabs
    }

    return tabs.filter(({description, label}) => {
      const isLabelMatch = label.toLowerCase().includes(filter.toLowerCase())
      const isDescriptionMatch = description ? description.toLowerCase().includes(filter.toLowerCase()) : false
      return isLabelMatch || isDescriptionMatch
    })
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

  // Basic task to debounce/throttle resize events
  _resizeTask: task(function * () {
    this.set('_containerWidth', this.$(`.${this.get('css')}-container`).width())
    yield timeout(1000 / 60)
  }).keepLatest(),

  // == DOM Events ============================================================

  // == Lifecycle Hooks =======================================================

  // == Actions ===============================================================

  actions: {
    _filterTabs (event) {
      this.set('_filter', event.target.value)
    },

    _resize () {
      this.get('_resizeTask').perform()
    }
  }

})

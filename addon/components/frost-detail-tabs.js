/**
 * Component definition for the frost-detail-tabs component
 */

import Ember from 'ember'
const {A, Logger, Object: EmberObject, get, isEmpty, typeOf} = Ember
import computed, {readOnly} from 'ember-computed-decorators'
import {task, timeout} from 'ember-concurrency'
import {Component} from 'ember-frost-core'
import {PropTypes} from 'ember-prop-types'

import layout from '../templates/components/frost-detail-tabs'

const SCROLL_ANIMATION_DURATION = 100

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
    selectedTab: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
      PropTypes.EmberObject
    ]),
    onSelect: PropTypes.func.isRequired,

    // State
    _isInserted: PropTypes.bool,
    _registeredTabs: PropTypes.array,
    _scrollClass: PropTypes.string,
    _tabsWidth: PropTypes.number,
    _viewport: PropTypes.EmberObject
  },

  getDefaultProps () {
    return {
      // State defaults
      _isInserted: false,
      _registeredTabs: {},
      _scrollClass: '.frost-scroll',
      _tabsWidth: null,
      _viewport: EmberObject.create({
        scrollLeft: 0,
        width: null
      })
    }
  },

  // == Computed Properties ===================================================

  // A change in the number of tabs or the size of the viewport can have an
  // impact on the overflow state so we need to recalculate when those change;
  // however, they aren't directly part of the calculation, which is why those
  // values are present in the observation but not in the function.
  @readOnly
  @computed('_isInserted', '_tabs.[]', '_viewport.width')
  _isInOverflow (isInserted) {
    // If the tabs container isn't in the DOM, we can't measure it
    if (!isInserted) {
      return false
    }

    return this.$(this._scrollClass).width() < this.$(`.${this.get('css')}-tabs`).width()
  },

  // Wrap selectedTab for the same reasons outlined in the comments for _tabs
  @readOnly
  @computed('selectedTab')
  _selectedTab (selectedTab) {
    if (!selectedTab || typeOf(selectedTab) === 'object' || typeOf(selectedTab) === 'instance') {
      return {
        id: null,
        label: null
      }
    }

    const label = selectedTab
    return {
      id: label,
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
    if (isEmpty(tabs) || typeOf(tabs[0]) === 'object' || typeOf(tabs[0]) === 'instance') {
      const isMissingProperties = tabs.some(({id, label}) => {
        return !id || !label
      })

      if (isMissingProperties) {
        Logger.error(`frost-detail-tabs: Objects provided to the 'tabs' property must include an 'id' and 'label'`)
      }

      return tabs.filter(({id}) => {
        // Strip the 'More' tab out of the set of scrollable tabs
        return id !== 'more'
      })
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

  // Update the viewport [min, max]
  // Unfortunately I don't know of another way to check what is visible other
  // than relying on the scrollLeft value and the width of the scroll area
  _updateViewport () {
    const $scrollElement = this.$(this._scrollClass)
    this.set('_viewport.scrollLeft', $scrollElement[0].scrollLeft)
    this.set('_viewport.width', $scrollElement.width())
  },

  // Scroll to the selected tab if it's not already in the viewport
  _maybeScrollViewport (selectedTabId) {
    // If the tab isn't visible yet or is currently in the viewport do nothing
    const viewportScrollLeft = this.get('_viewport.scrollLeft')
    const viewportWidth = this.get('_viewport.width')
    const registeredTab = this.get('_registeredTabs')[selectedTabId]
    if (!registeredTab) {
      return
    }

    const {tabLeft, tabWidth} = registeredTab
    if (viewportScrollLeft <= tabLeft && (tabLeft + tabWidth) <= viewportScrollLeft + viewportWidth) {
      return
    }

    // Calculate how much to scroll - up to the full width of the viewport
    // left/right clamped between 0 and the content width
    const tabsWidth = this.$(`.${this.get('css')}-tabs`).width()
    const $scrollElement = this.$(this._scrollClass)
    const scrollWidth = $scrollElement.width()
    const previousScrollLeft = $scrollElement[0].scrollLeft

    let scrollLeft = tabLeft
    if (tabLeft + scrollWidth > tabsWidth) {
      // Clamp to the width of the content
      scrollLeft = tabsWidth - scrollWidth
    } else if (tabLeft < previousScrollLeft) {
      // Clamp to 0
      scrollLeft = Math.max(tabLeft + tabWidth - scrollWidth, 0)
    }

    this._scrollViewport(scrollLeft)
  },

  // Animate scrolling to a particular horizontal position
  _scrollViewport (scrollLeft) {
    this.$(this._scrollClass).animate({scrollLeft}, SCROLL_ANIMATION_DURATION)
      .promise()
      .then(() => {
        this.get('_updateViewportTask').perform()
      })
  },

  // == Tasks =================================================================

  // Basic task to debounce/throttle viewport updates
  _updateViewportTask: task(function * () {
    this._updateViewport()
    yield timeout(1000 / 60)
  }).keepLatest(),

  // == DOM Events ============================================================

  // == Lifecycle Hooks =======================================================

  didInsertElement () {
    this._super(...arguments)

    // Set the initial viewport and unblock CP chains reliant on DOM sizing
    Ember.run.schedule('sync', this, () => {
      this.get('_updateViewportTask').perform()
      this.set('_isInserted', true)
    })
  },

  didReceiveAttrs () {
    this._super(...arguments)

    // Scroll to the selected tab if it's already rendered and outside the viewport
    const selectedTabId = this.get('_selectedTab.id')
    if (this.get('_registeredTabs')[selectedTabId]) {
      this._maybeScrollViewport(selectedTabId)
    } else {
      // If the selected tab hasn't rendered yet wait until after the render queue and
      // then scroll to the selected tab if it's outside the viewport
      Ember.run.schedule('afterRender', this, () => {
        // Update the width of the content area so that we can determine if the
        // "scroll right" button should be enabled
        this.set('_tabsWidth', this.$(`.${this.get('css')}-tabs`).width())
        this._maybeScrollViewport(selectedTabId)
      })
    }
  },

  // == Actions ===============================================================

  actions: {
    // Tabs register as they are inserted into the DOM so that size
    // calculations can be performed when scrolling
    _register ({tabLeft, tabId, tabWidth}) {
      this.get('_registeredTabs')[tabId] = {tabLeft, tabWidth}
    },

    _resize () {
      this.get('_updateViewportTask').perform()
    },

    _scrollLeft () {
      const $scrollElement = this.$(this._scrollClass)
      const scrollWidth = $scrollElement.width()
      const previousScrollLeft = $scrollElement[0].scrollLeft

      // Scroll left up to the width of the viewport clamped to 0
      const scrollPageLeft = previousScrollLeft - scrollWidth
      const scrollLeft = scrollPageLeft > 0 ? scrollPageLeft : 0

      this._scrollViewport(scrollLeft)
    },

    _scrollRight () {
      const $scrollElement = this.$(this._scrollClass)
      const scrollWidth = $scrollElement.width()
      const previousScrollLeft = $scrollElement[0].scrollLeft

      // Scroll right up to the width of the viewport clamped to the content width
      const scrollLeftTarget = previousScrollLeft + scrollWidth
      const maximumScrollLeft = this.$(`.${this.get('css')}-tabs`).width() - scrollWidth
      const scrollLeft = scrollLeftTarget < maximumScrollLeft ? scrollLeftTarget : maximumScrollLeft

      this._scrollViewport(scrollLeft)
    }
  }

})

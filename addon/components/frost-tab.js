import Ember from 'ember'
import layout from '../templates/components/frost-tab'
import computed, {readOnly} from 'ember-computed-decorators'
import PropTypesMixin, {PropTypes} from 'ember-prop-types'

const {
  Component
} = Ember

export default Component.extend(PropTypesMixin, {
  // == Component properties ==================================================

  layout: layout,
  classNames: ['frost-tab'],
  classNameBindings: ['isSelected:active'],

  // == State properties ======================================================

  propTypes: {
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    content: PropTypes.oneOfType([
      PropTypes.EmberObject,
      PropTypes.object
    ]).isRequired,
    contentClass: PropTypes.string,
    disabled: PropTypes.bool,
    // Set by the parent component
    parentHook: PropTypes.string,
    targetOutlet: PropTypes.string.isRequired,
    selectedTab: PropTypes.string,
    onChange: PropTypes.func.isRequired
  },

  getDefaultProps () {
    return {
      disabled: false
    }
  },

  init () {
    // This needs to be setup outside of ember-prop-types getDefaultProps() because it does not work
    // within the timing of tests
    this.set('hook', `${this.parentHook}-${this.id}`)
    this._super(...arguments)
  },

  // == Computed properties ===================================================

  @readOnly
  @computed('id', 'selectedTab')
  isSelected (id, selectedTab) {
    return id === selectedTab && !this.disabled
  },

  // == Actions ===============================================================

  actions: {
    change () {
      if (this.onChange) {
        this.onChange(this.id)
      }
    }
  }
})

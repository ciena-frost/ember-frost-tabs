import Ember from 'ember'
import layout from './template'
import FrostTabs from 'ember-frost-tabs/pods/components/frost-tabs/component'

export default Ember.Component.extend({
  layout: layout,
  classNames: ['content'],
  classNameBindings: ['isSelected::hidden', 'tabClassNames'],

  frostTabs: null,

  init () {
    this._super(...arguments)
    this.set('frostTabs', this.nearestOfType(FrostTabs))
    this.get('frostTabs').register(this)
  },

  isSelected: Ember.computed('frostTabs.selection', function () {
    return this.get('id') === this.get('frostTabs.selection')
  })
})

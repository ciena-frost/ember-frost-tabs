import Ember from 'ember'
import layout from './template'

export default Ember.Component.extend({
  layout: layout,
  classNames: ['frost-tabs'],

  tabs: [],

  init () {
    this._super(...arguments)
    this.set('tabs', [])
  },

  register (frostTab) {
    Ember.run.schedule('render', () => {
      this.get('tabs').addObject({
        alias: frostTab.get('alias'),
        disabled: frostTab.get('disabled'),
        id: frostTab.get('id')
      })
    })
  }
})

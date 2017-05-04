import Ember from 'ember'
const {Controller, get} = Ember
import computed, {readOnly} from 'ember-computed-decorators'

export default Controller.extend({

  // API driven

  apiTabs: [
    { id: 'A', label: 'A', value: 'A aardvark' },
    { id: 'B', label: 'B', value: 'B bear' },
    { id: 'C', label: 'C', value: 'C chipmunk' },
    { id: 'D', label: 'D', value: 'D draft' },
    { id: 'E', label: 'E', value: 'E ears' },
    { id: 'F', label: 'F', value: 'F funky' }
  ],

  @readOnly
  @computed('selectedTab')
  tabContent (selectedTab) {
    const tab = this.get('apiTabs').findBy('label', selectedTab)
    return tab ? get(tab, 'value') : selectedTab
  },

  // State management

  tabs: [
    'View',
    'Attributes',
    'Footab',
    'Bartab',
    'Biztab'
    // 'Baztab',
    // 'Looooooongtab',
    // 'Looooooongertab',
    // 'Looooooongesttab',
    // 'Woooooooooooooah'
  ],
  selectedTab: null,
  queryParams: ['selectedTab'],

  _selectTab (tab) {
    this.get('tabs').addObject(tab)
    this.set('selectedTab', tab)
  },

  actions: {
    onSelect (tab) {
      Ember.run.schedule('sync', this, this._selectTab.bind(this, tab))
    }
  }
})

import Ember from 'ember'
const {A, Controller, get} = Ember
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
    const tab = A(this.get('apiTabs')).findBy('label', selectedTab)
    return tab ? get(tab, 'value') : selectedTab
  },

  // State management

  tabs: A([
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
  ]),
  selectedTab: null,
  selectedSubTab: null,
  subtabs: [
    {
      'tab': 'View',
      'content': [
        'ViewSubTab1',
        'ViewSubTab2'
        // {icon: 'view-medium', pack: 'frost', label: 'ViewSubTab2'}
      ]
    },
    {
      'tab': 'Footab',
      'content': [
        'Footab1',
        'Footab2'
      ]
    }
  ],
  queryParams: ['selectedTab', 'selectedSubTab'],

  _selectTab (tab) {
    this.get('tabs').addObject(tab)
    this.set('selectedTab', tab)
  },
  _selectSubTab (tab) {
    this.set('selectedSubtab', tab)
  },

  actions: {
    onSelect (tab) {
      Ember.run.schedule('sync', this, this._selectTab.bind(this, tab))
    },
    onSubtabSelect (subtab) {
      Ember.run.schedule('sync', this, this._selectSubtab.bind(this, subtab))
    }
  }
})

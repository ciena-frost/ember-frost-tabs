import Ember from 'ember'
const {A, Controller, Logger, get, isEmpty, run} = Ember
import computed, {readOnly} from 'ember-computed-decorators'

export default Controller.extend({

  // API driven

  apiTabs: [
    {
      id: 1,
      label: 'AIS profile',
      value: 'A aardvark',
      actions: [
        {
          action: {
            type: 'form',
            endpoint: 'foo/api/v1/bar'
          },
          icon: {
            name: 'add',
            pack: 'frost'
          },
          label: 'Add'
        },
        {
          action: {
            type: 'export',
            endpoint: 'biz/api/v1/baz'
          },
          icon: {
            name: 'export',
            pack: 'frost'
          },
          label: 'Export'
        }
      ]
    },
    {id: 2, label: 'BFD profile', value: 'B bear'},
    {id: 3, label: 'Channels', value: 'C chipmunk'},
    {id: 4, label: 'Differential provisioning', value: 'D draft'},
    {id: 5, label: 'External alarms provisioning', value: 'E ears'},
    {id: 6, label: 'External controls', value: 'F funky'},
    {id: 7, label: 'GMPLS TP tunnel', value: 'F funky'},
    {id: 8, label: 'Media channels', value: 'F funky'}
  ],

  @readOnly
  @computed('selectedTab')
  tabContent (selectedTab) {
    const tab = A(this.get('apiTabs')).findBy('label', selectedTab)
    return tab ? get(tab, 'value') : selectedTab
  },

  @readOnly
  @computed('selectedTab')
  tabActions (selectedTab) {
    const tab = A(this.get('apiTabs')).findBy('label', selectedTab)
    return tab ? get(tab, 'actions') : []
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
    }
  ],
  queryParams: ['selectedTab', 'selectedSubTab'],

  @readOnly
  @computed('subtabs', 'selectedTab')
  viewSubtabs: function (subtabs, selectedTab) {
    if (isEmpty(A(subtabs).findBy('tab', selectedTab))) {
      return []
    }
    return A(subtabs).findBy('tab', selectedTab).content
  },

  _selectTab (tab) {
    this.get('tabs').addObject(tab)
    this.set('selectedTab', tab)
  },
  _selectSubtab (tab) {
    this.set('selectedSubtab', tab)
  },

  actions: {
    dispatch (action) {
      const {type} = action
      switch (type) {
        default:
          Logger.warn(`Unknown action type dispatched: ${type}`)
      }
    },
    onSelect (tab) {
      run.schedule('sync', this, this._selectTab.bind(this, tab))
    },
    onSubtabSelect (subtab) {
      run.schedule('sync', this, this._selectSubtab.bind(this, subtab))
    }
  }
})

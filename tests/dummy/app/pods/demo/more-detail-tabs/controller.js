import Ember from 'ember'
const {A, Controller, Logger, get, isEmpty, run} = Ember
import computed, {readOnly} from 'ember-computed-decorators'

export default Controller.extend({

  // API driven

  apiTabs: [
    {
      id: 'AIS profile',
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
          label: 'Add',
          isVisible: true,
          disabled: true
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
          label: 'Export',
          isVisible: true,
          disabled: false
        }
      ]
    },
    {id: 'BFD profile', label: 'BFD profile', value: 'B bear'},
    {id: 'Channels', label: 'Channels', value: 'C chipmunk'},
    {id: 'Differential provisioning', label: 'Differential provisioning', value: 'D draft'},
    {id: 'External alarms', label: 'External alarms provisioning', value: 'E ears'},
    {id: 'External controls', label: 'External controls', value: 'F funky'},
    {id: 'GMPLS TP tunnel', label: 'GMPLS TP tunnel', value: 'F funky'},
    {id: 'Media channels', label: 'Media channels', value: 'F funky'}
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
  ]),
  selectedTab: null,
  selectedSubTab: null,
  subtabs: [
    {
      'tab': 'View',
      'content': [
        'ViewSubTab1',
        'ViewSubTab2'
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

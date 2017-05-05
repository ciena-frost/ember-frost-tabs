import Ember from 'ember'
const {A, Controller, get} = Ember
import computed, {readOnly} from 'ember-computed-decorators'

export default Controller.extend({

  // API driven

  apiTabs: [
    { id: 1, label: 'AIS profile', value: 'A aardvark' },
    { id: 2, label: 'BFD profile', value: 'B bear' },
    { id: 3, label: 'Channels', value: 'C chipmunk' },
    { id: 4, label: 'Differential provisioning', value: 'D draft' },
    { id: 5, label: 'External alarms provisioning', value: 'E ears' },
    { id: 6, label: 'External controls', value: 'F funky' },
    { id: 7, label: 'GMPLS TP tunnel', value: 'F funky' },
    { id: 8, label: 'Media channels', value: 'F funky' },
    { id: 9, label: 'MPLS L2-VPN', value: 'F funky' },
    { id: 10, label: 'MPLS tunnel-COS profile', value: 'F funky' },
    { id: 11, label: 'OSRP per shelf config', value: 'F funky' },
    { id: 12, label: 'OSRP local node config', value: 'F funky' },
    { id: 13, label: 'OSRP remote node config', value: 'F funky' },
    { id: 14, label: 'Packet connections', value: 'F funky' },
    { id: 15, label: 'Packet infrastructure connections', value: 'F funky' },
    { id: 16, label: 'Photonics configuration management', value: 'F funky' },
    { id: 17, label: 'Photonic connections', value: 'F funky' },
    { id: 18, label: 'Routing profiles (DTL)', value: 'F funky' },
    { id: 19, label: 'SNMP agents status', value: 'F funky' },
    { id: 20, label: 'SPLI', value: 'F funky' },
    { id: 21, label: 'Subnetwork connections', value: 'F funky' },
    { id: 22, label: 'Tasty cakes', value: 'F funky' },
    { id: 23, label: 'U and chicken', value: 'F funky' },
    { id: 24, label: 'Victorious pizza', value: 'F funky' },
    { id: 25, label: 'West side sushi', value: 'F funky' },
    { id: 26, label: 'West side bacon', value: 'F funky' },
    { id: 27, label: 'West side steak', value: 'F funky' },
    { id: 28, label: 'Xenomorph pizza', value: 'F funky' },
    { id: 29, label: 'Zebra steaks', value: 'F funky' }
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

import {expect} from 'chai'
import {$hook, initialize as initializeHook} from 'ember-hook'
import wait from 'ember-test-helpers/wait'
import hbs from 'htmlbars-inline-precompile'
import {beforeEach, describe, it} from 'mocha'

const myHook = 'frost-detail-tabs'
const tabs = [{id: 'View', label: 'View'}, {id: 'Attributes', label: 'Attributes'}]
const selectedTab = 'View'

const apiTabs = [
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
  {id: 'BFD profile', label: 'BFD profile', value: 'B bear'}
]

const template = hbs`
  {{#frost-detail-tabs
      hook=myHook
      tabs=tabs
      selectedTab=selectedTab
      onSelect=(action 'onSelect')
    as |controls|
    }}
      {{controls.more
        tabs=apiTabs
      }}
    {{/frost-detail-tabs}}
`

import {integration} from 'dummy/tests/helpers/ember-test-utils/setup-component-test'

const test = integration('frost-detail-tabs')
describe(test.label, function () {
  test.setup()

  beforeEach(function () {
    initializeHook()
    this.setProperties({
      myHook,
      tabs,
      apiTabs,
      selectedTab
    })
    this.on('onSelect', function (tab) {
      this.set('selectedTab', tab)
    })
  })

  it('Renders', function () {
    this.setProperties({
      selectedTab: selectedTab
    })
    this.render(template)

    return wait()
      .then(() => {
        expect($hook(`${myHook}`)).to.have.length(1)
      })
  })

  it('should have two tabs', function () {
    this.setProperties({
      selectedTab: selectedTab
    })
    this.render(template)

    return wait()
      .then(() => {
        expect($hook(`${myHook}-${tabs[0].id}`)).to.have.length(1)
        expect($hook(`${myHook}-${tabs[1].id}`)).to.have.length(1)
      })
  })

  it('should have selected tab  by default', function () {
    this.render(template)

    return wait()
      .then(() => {
        expect(this.$('.frost-detail-tab.selected')).to.have.length(1)
      })
  })

  it('should have more tab', function () {
    this.render(template)

    return wait()
      .then(() => {
        expect(this.$('.frost-detail-tabs-more-tab')).to.have.length(1)
      })
  })
})


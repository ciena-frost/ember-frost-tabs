import {expect} from 'chai'
import {$hook, initialize} from 'ember-hook'
import wait from 'ember-test-helpers/wait'
import hbs from 'htmlbars-inline-precompile'
import {beforeEach, describe, it} from 'mocha'

const myHook = 'detail-tab-actions'
const tabActions = [
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

const template = hbs`
  {{frost-detail-tab-actions
      hook=myHook
      tabActions=tabActions
      onDispatch=(action 'dispatch')
  }}
`

import {integration} from 'dummy/tests/helpers/ember-test-utils/setup-component-test'

const test = integration('frost-detail-tab-actions')
describe(test.label, function () {
  test.setup()

  beforeEach(function () {
    initialize()
    this.setProperties({
      myHook,
      tabActions

    })
    this.on('dispatch', function () {
    })
  })

  it('Renders', function () {
    this.render(template)

    return wait()
      .then(() => {
        expect($hook(`${myHook}`)).to.have.length(1)
        // expect(this.$('.frost-detail-subtab.selected')).to.have.length(1)
      })
  })
})


import {expect} from 'chai'
import {$hook, initialize as initializeHook} from 'ember-hook'
import wait from 'ember-test-helpers/wait'
import hbs from 'htmlbars-inline-precompile'
import {beforeEach, describe, it} from 'mocha'

const myHook = 'frost-detail-subtabs'
const subtabs = ['ViewSubTab1', 'ViewSubTab2']
const selectedSubtabId = subtabs[0]

const template = hbs`
  {{frost-detail-subtabs
        hook=myHook
        subtabs=subtabs
        selectedSubtab=selectedSubtabId
        onSelect=(action 'onSubtabSelect')
  }}
`

import {integration} from 'dummy/tests/helpers/ember-test-utils/setup-component-test'

const test = integration('frost-details-subtabs')
describe(test.label, function () {
  test.setup()

  beforeEach(function () {
    initializeHook()
    this.setProperties({
      myHook,
      subtabs,
      selectedSubtabId
    })
    this.on('onSubtabSelect', function (tab) {
      this.set('selectedSubtabId', tab)
    })
  })

  it('Renders', function () {
    this.render(template)

    return wait()
      .then(() => {
        expect($hook(`${myHook}`)).to.have.length(1)
      })
  })

  it('should have two subtabs', function () {
    this.render(template)

    return wait()
      .then(() => {
        expect($hook(`${myHook}-subtab-${subtabs[0]}`)).to.have.length(1)
        expect($hook(`${myHook}-subtab-${subtabs[1]}`)).to.have.length(1)
      })
  })

  it('find a selected tab id', function () {
    this.render(template)

    return wait()
      .then(() => {
        expect($hook(`${myHook}-subtab-${selectedSubtabId}`)).to.have.length(1)
      })
  })

  it('should have selected a sub-tab by default', function () {
    this.render(template)

    return wait()
      .then(() => {
        expect($hook(`${myHook}-subtab-${selectedSubtabId}`).find('.selected')).to.have.length(1)
      })
  })
})


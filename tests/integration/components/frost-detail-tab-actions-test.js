import {expect} from 'chai'
import {$hook, initialize} from 'ember-hook'
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
    initialize()
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
        expect(this.$('.frost-detail-subtab.selected')).to.have.length(1)
      })
  })

  it('should have two subtabs', function () {
    this.render(template)

    return wait()
      .then(() => {
        expect(this.$('.frost-detail-subtab')).to.have.length(2)
      })
  })

  it('find a selected tab id', function () {
    this.render(template)

    return wait()
      .then(() => {
        expect($hook(`${myHook}-subtab-${selectedSubtabId}`)).to.have.length(1)
      })
  })

  it('should have slected a subtab by default', function () {
    this.render(template)

    return wait()
      .then(() => {
        expect(this.$('.frost-detail-subtab.selected')).to.have.length(1)
      })
  })

})


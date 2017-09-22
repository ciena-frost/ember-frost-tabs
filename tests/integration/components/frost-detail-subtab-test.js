import {expect} from 'chai'
import {$hook, initialize} from 'ember-hook'
import wait from 'ember-test-helpers/wait'
import hbs from 'htmlbars-inline-precompile'
import {beforeEach, describe, it} from 'mocha'

const hookPrefix = 'frost-detail-subtabs'
const tab = {
  id: 'My-Tab',
  label: 'My-Tab',
  icon: 'view-medium',
  pack: 'frost'
}
const selectedTab = tab

const template = hbs`
{{frost-detail-subtab
  hook=(concat hookPrefix '-subtab-' tab.id)
  subtab=tab
  onSelect=(action 'onSelect')
  selectedSubtab=selectedTab
}}
`

import {integration} from 'dummy/tests/helpers/ember-test-utils/setup-component-test'

const test = integration('frost-details-subtab')
describe(test.label, function () {
  test.setup()

  beforeEach(function () {
    initialize()
    this.setProperties({
      hookPrefix,
      tab,
      selectedTab
    })
    this.on('onSelect', function (tab) {
      this.set('selectedTab', tab)
    })
  })

  it('Renders', function () {
    this.render(template)

    return wait()
      .then(() => {
        expect($hook(`${hookPrefix}-subtab-${tab.id}`)).to.have.length(1)
      })
  })

  it('if sub-tab is selected', function () {
    this.render(template)
    return wait()
      .then(() => {
        expect(this.$('.frost-detail-subtab-label.selected')).to.have.length(1)
      })
  })

  it('if sub-tab lable is My-Tab', function () {
    this.render(template)
    return wait()
      .then(() => {
        expect(this.$('.frost-detail-subtab-label.selected').text().trim()).to.eql(`${tab.label}`)
      })
  })
})


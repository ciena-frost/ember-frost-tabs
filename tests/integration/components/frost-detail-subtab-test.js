import {expect} from 'chai'
import {$hook, initialize as initializeHook} from 'ember-hook'
import wait from 'ember-test-helpers/wait'
import {integration} from 'ember-test-utils/test-support/setup-component-test'
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

const test = integration('frost-details-subtab')
describe(test.label, function () {
  test.setup()

  beforeEach(function () {
    initializeHook()
    this.setProperties({
      hookPrefix,
      tab,
      selectedTab
    })
    this.on('onSelect', function (tab) {
      this.set('selectedTab', tab)
    })
  })

  it('should render', function () {
    this.render(template)

    return wait()
      .then(() => {
        expect($hook(`${hookPrefix}-subtab-${tab.id}`)).to.have.length(1)
      })
  })

  it('should have sub-tab as selected', function () {
    this.render(template)
    return wait()
      .then(() => {
        expect(this.$('.frost-detail-subtab-label.selected')).to.have.length(1)
      })
  })

  it('should have sub-tab label of My-Tab', function () {
    this.render(template)
    return wait()
      .then(() => {
        expect(this.$('.frost-detail-subtab-label.selected').text().trim()).to.eql(`${tab.label}`)
      })
  })
})

import { expect } from 'chai'
import {
  describeComponent,
  it
} from 'ember-mocha'
import { beforeEach } from 'mocha'
import hbs from 'htmlbars-inline-precompile'
import {
  $hook,
  initialize
} from 'ember-hook'
import wait from 'ember-test-helpers/wait'

const frostTabHook = 'frost-tab'
const frostTabSelectedHook = 'frost-tab-selected'
const hookName = 'my-hook'

const tabId = 'template'
const tabText = 'Template'
const targetOutlet = 'my-outlet'

const template = hbs`
  {{frost-tab
    id=tabId
    text=tabText
    selectedTab=selectedTab
    content= (component 'tab-content' text='Template')
    targetOutlet=targetOutlet
    hook=hookName
    classNames=classNames
    disabled=disabled
  }}
  <div class='content' data-test={{hook (concat hook 'content')}}>
    {{#from-elsewhere name=targetOutlet as |tab|}}
      {{component tab.content}}
    {{/from-elsewhere}}
  </div>
`

describeComponent(
  'frost-tab',
  'Integration: FrostTabComponent',
  {
    integration: true
  },
  function () {
    beforeEach(function () {
      initialize()
      this.setProperties({
        tabId: tabId,
        tabText: tabText,
        targetOutlet: targetOutlet
      })
    })

    it('Renders', function () {
      this.setProperties({
        selectedTab: tabId
      })
      this.render(template)
      return wait()
        .then(() => {
          expect($hook(`${frostTabSelectedHook}`)).to.have.length(1)
          expect($hook(`${frostTabSelectedHook}`).find('button.active')).to.have.length(1)
          expect($hook('content').text().trim()).to.be.equal(tabText)
        })
    })

    it('No tab selected', function () {
      this.render(template)

      return wait()
        .then(() => {
          expect($hook(`${frostTabHook}`)).to.have.length(1)
          expect($hook(`${frostTabSelectedHook}`)).to.have.length(0)
          expect($hook(`${frostTabSelectedHook}`).find('button.active')).to.have.length(0)
        })
    })

    it('Selected tab', function () {
      this.setProperties({
        selectedTab: tabId
      })
      this.render(template)

      return wait()
        .then(() => {
          expect($hook('content').text().trim()).to.be.equal(tabText)
        })
    })

    it('Disabled', function () {
      this.setProperties({
        disabled: true
      })
      this.render(template)

      return wait()
        .then(() => {
          expect($hook(`${frostTabHook}`)).to.have.length(1)
          expect($hook(`${frostTabHook}`).find('button.disabled')).to.have.length(1)
        })
    })

    it('Set hook', function () {
      this.setProperties({
        selectedTab: tabId,
        hookName: hookName
      })
      this.render(template)

      return wait()
        .then(() => {
          expect($hook(`${hookName}${frostTabSelectedHook}`)).to.have.length(1)
          expect($hook(`${hookName}${frostTabSelectedHook}`).find('button.active')).to.have.length(1)
        })
    })

    it('Set classes', function () {
      this.setProperties({
        selectedTab: tabId,
        classNames: 'my-class'
      })
      this.render(template)
      return wait()
        .then(() => {
          expect($('.my-class')).to.have.length(1)
        })
    })
  }
)
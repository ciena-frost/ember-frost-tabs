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

const frostTabsTabHook = '-tabs-tab'
const hookName = 'my-hook'

const templateTabId = 'template'
const controllerTabId = 'controller'
const templateTabText = 'Template'
const controllerTabText = 'Controller'

const template = hbs`
  {{frost-tabs
    hook=hookName
    onChange=(action 'tabSelected')
    selectedTab=selectedTab
    classNames=classNames
    tabs=(array
      (component 'frost-tab'
        id=templateTabId
        text=templateTabText
        content= (component 'tab-content' text='Template')
      )
      (component 'frost-tab'
        id=controllerTabId
        text=controllerTabText
        content= (component 'tab-content' text='Controller')
      )
      (component 'frost-tab'
        id='css'
        text='CSS'
        disabled=true
        content= (component 'tab-content' text='css')
      )
    )
  }}
`

describeComponent(
  'frost-tabs',
  'Integration: FrostTabsComponent',
  {
    integration: true
  },
  function () {
    beforeEach(function () {
      initialize()
      this.setProperties({
        templateTabId: templateTabId,
        controllerTabId: controllerTabId,
        templateTabText: templateTabText,
        controllerTabText: controllerTabText
      })
      this.on('tabSelected', function (tab) {
        this.set('selectedTab', tab)
      })
    })

    it('Renders', function (done) {
      this.setProperties({
        selectedTab: templateTabId
      })
      this.render(template)

      return wait()
        .then(() => {
          expect($hook(`${frostTabsTabHook}`, { index: 0 })).to.have.length(1)
          expect($hook(`${frostTabsTabHook}`, { index: 0 }).find('button.active')).to.have.length(1)

          return capture('frost-tabs', done, {
            experimentalSvgs: true
          })
        })
    })

    it('Default selected tab', function () {
      this.render(template)

      return wait()
        .then(() => {
          expect($hook(`${frostTabsTabHook}`, { index: 0 }).find('button.active')).to.have.length(0)
          expect($hook(`${frostTabsTabHook}`, { index: 1 }).find('button.active')).to.have.length(0)
          expect($hook(`${frostTabsTabHook}`, { index: 2 }).find('button.active')).to.have.length(0)
          expect($hook('-tab-content').text().trim()).to.be.empty
        })
    })

    it('Selected tab', function () {
      this.setProperties({
        selectedTab: controllerTabId
      })
      this.render(template)

      return wait()
        .then(() => {
          expect($hook('-tab-content').text().trim()).to.be.equal(controllerTabText)
        })
    })

    it('Set hook', function () {
      this.setProperties({
        selectedTab: templateTabId,
        hookName: hookName
      })
      this.render(template)

      return wait()
        .then(() => {
          expect($hook(`${hookName}${frostTabsTabHook}`, { index: 0 })).to.have.length(1)
          expect($hook(`${hookName}${frostTabsTabHook}`, { index: 0 }).find('button.active')).to.have.length(1)
        })
    })

    it('Set classes', function () {
      this.setProperties({
        selectedTab: templateTabId,
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

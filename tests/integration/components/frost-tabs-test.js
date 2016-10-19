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

const frostTabsHook = 'frost-tabs-'
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

    it('Renders', function () {
      this.setProperties({
        selectedTab: templateTabId
      })
      this.render(template)
      expect($hook(`${frostTabsHook}0`)).to.have.length(1)
      expect($hook(`${frostTabsHook}0`).find('button.active')).to.have.length(1)
    })

    it('Default selected tab', function () {
      this.render(template)
      expect($hook(`${frostTabsHook}0`).find('button.active')).to.have.length(0)
      expect($hook(`${frostTabsHook}1`).find('button.active')).to.have.length(0)
      expect($hook(`${frostTabsHook}2`).find('button.active')).to.have.length(0)
      expect($hook(`${frostTabsHook}content`).text().trim()).to.be.empty
    })

    it('Selected tab', function () {
      this.setProperties({
        selectedTab: controllerTabId
      })
      this.render(template)
      expect($hook(`${frostTabsHook}content`).text().trim()).to.be.equal(controllerTabText)
    })

    it('Set hook', function () {
      this.setProperties({
        selectedTab: templateTabId,
        hookName: hookName
      })
      this.render(template)
      expect($hook(`${hookName}${frostTabsHook}0`)).to.have.length(1)
      expect($hook(`${hookName}${frostTabsHook}0`).find('button.active')).to.have.length(1)
    })

    it('Set classes', function () {
      this.setProperties({
        selectedTab: templateTabId,
        classNames: 'my-class'
      })
      this.render(template)
      expect($('.my-class')).to.have.length(1)
    })
  }
)

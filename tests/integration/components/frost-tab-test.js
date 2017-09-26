import {expect} from 'chai'
import Ember from 'ember'
import {$hook, initialize} from 'ember-hook'
import wait from 'ember-test-helpers/wait'
import hbs from 'htmlbars-inline-precompile'
import {beforeEach, describe, it} from 'mocha'

const {$} = Ember

const frostTabHook = '-tab'
const hookName = 'my-hook'
const onChange = () => {}
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
    parentHook=parentHookName
    classNames=classNames
    disabled=disabled
    onChange=onChange
  }}
  <div class='content' data-test={{hook (concat hook 'content')}}>
    {{#from-elsewhere name=targetOutlet as |tab|}}
      {{component tab.content}}
    {{/from-elsewhere}}
  </div>
`

import {integration} from 'dummy/tests/helpers/ember-test-utils/setup-component-test'

const test = integration('frost-tab')
describe(test.label, function () {
  test.setup()

  beforeEach(function () {
    initialize()
    this.setProperties({
      onChange,
      tabId,
      tabText,
      targetOutlet
    })
  })

  it('Renders', function (done) {
    this.timeout(5000)
    this.setProperties({
      selectedTab: tabId
    })
    this.render(template)
    return wait()
      .then(() => {
        expect($hook(`${frostTabHook}`, {selected: true})).to.have.length(1)
        expect($hook(`${frostTabHook}`, {selected: true}).find('button.active')).to.have.length(1)
        expect($hook('content').text().trim()).to.be.equal(tabText)

        return capture('frost-tab', done, {
          experimentalSvgs: true
        })
      })
  })

  it('No tab selected', function () {
    this.render(template)

    return wait()
      .then(() => {
        expect($hook(`${frostTabHook}`, {selected: false})).to.have.length(1)
        expect($hook(`${frostTabHook}`, {selected: true})).to.have.length(0)
        expect($hook(`${frostTabHook}`, {selected: true}).find('button.active')).to.have.length(0)
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

  it('Set parent hook', function () {
    this.setProperties({
      selectedTab: tabId,
      hookName: hookName
    })
    this.render(template)

    return wait()
      .then(() => {
        expect($hook(`${hookName}${frostTabHook}`, {selected: true})).to.have.length(1)
        expect($hook(`${hookName}${frostTabHook}`, {selected: true}).find('button.active')).to.have.length(1)
      })
  })

  it('Set parent hook', function () {
    this.setProperties({
      selectedTab: tabId,
      parentHookName: hookName
    })
    this.render(hbs`
      {{frost-tab
        id=tabId
        text=tabText
        selectedTab=selectedTab
        content= (component 'tab-content' text='Template')
        targetOutlet=targetOutlet
        parentHook=parentHookName
        onChange=onChange
      }}`)

    return wait()
      .then(() => {
        expect($hook(`${hookName}-${tabId}`)).to.have.length(1)
        expect($hook(`${hookName}-${tabId}${frostTabHook}`, {selected: true})).to.have.length(1)
        expect($hook(`${hookName}-${tabId}${frostTabHook}`, {selected: true}).find('button.active')).to.have.length(1)
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
})

import Ember from 'ember'
import { expect } from 'chai'
import {
  describeComponent,
  it
} from 'ember-mocha'
import hbs from 'htmlbars-inline-precompile'

describeComponent(
  'frost-tabs',
  'Integration: FrostTabsComponent',
  {
    integration: true
  },
  function () {
    it('renders frost-tabs', function () {
      this.set('selectedTab', 'controller')
      this.on('tabSelected', function (tab) {
        this.set('selectedTab', tab)
      })
      this.render(hbs`
        {{#frost-tabs on-change=(action 'tabSelected') selection=selectedTab}}
          {{#frost-tab alias='Template' id='template'}}
            <div id='content'>
              Template
            </div>
          {{/frost-tab}}
          {{#frost-tab alias='Controller' id='controller'}}
            <div id='content'>
              controller
            </div>
          {{/frost-tab}}
          {{#frost-tab alias='CSS' disabled=true id='css'}}
            <div id='content'>
              css
            </div>
          {{/frost-tab}}
        {{/frost-tabs}}
      `)
      expect(this.$('.content.hidden')).to.have.length(2)
    })

    it('renders frost-tabs and default tab is controller tab', function () {
      this.set('selectedTab', 'controller')
      this.on('tabSelected', function (tab) {
        this.set('selectedTab', tab)
      })
      this.render(hbs`
        {{#frost-tabs on-change=(action 'tabSelected') selection=selectedTab}}
          {{#frost-tab alias='Template' id='template'}}
            <div id='content'>
              Template
            </div>
          {{/frost-tab}}
          {{#frost-tab alias='Controller' id='controller'}}
            <div id='content'>
              controller
            </div>
          {{/frost-tab}}
          {{#frost-tab alias='CSS' disabled=true id='css'}}
            <div id='content'>
              css
            </div>
          {{/frost-tab}}
        {{/frost-tabs}}
      `)
      expect(this.$('#controller #content').text()).to.have.string('controller')
    })

    it('renders frost-tabs', function () {
      this.set('selectedTab', 'controller')
      this.on('tabSelected', function (tab) {
        this.set('selectedTab', tab)
      })
      this.render(hbs`
        {{#frost-tabs on-change=(action 'tabSelected') selection=selectedTab}}
          {{#frost-tab alias='Template' id='template'}}
            <div id='content'>
              Template
            </div>
          {{/frost-tab}}
          {{#frost-tab alias='Controller' id='controller'}}
            <div id='content'>
              controller
            </div>
          {{/frost-tab}}
          {{#frost-tab alias='CSS' disabled=true id='css'}}
            <div id='content'>
              css
            </div>
          {{/frost-tab}}
        {{/frost-tabs}}
      `)
      Ember.run(() => $('.frost-button').get(0).click())
      expect(this.get('selectedTab')).to.eql('template')
    })
  }
)

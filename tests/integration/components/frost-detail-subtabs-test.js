import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | frost detail subtabs', function() {
  setupComponentTest('frost-detail-subtabs', {
    integration: true
  });

  it('renders', function() {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    // Template block usage:
    // this.render(hbs`
    //   {{#frost-detail-subtabs}}
    //     template content
    //   {{/frost-detail-subtabs}}
    // `);

    this.render(hbs`{{frost-detail-subtabs}}`);
    expect(this.$()).to.have.length(1);
  });
});

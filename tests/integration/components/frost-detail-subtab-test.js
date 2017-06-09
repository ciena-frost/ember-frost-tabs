import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | frost detail subtab', function() {
  setupComponentTest('frost-detail-subtab', {
    integration: true
  });

  it('renders', function() {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    // Template block usage:
    // this.render(hbs`
    //   {{#frost-detail-subtab}}
    //     template content
    //   {{/frost-detail-subtab}}
    // `);

    this.render(hbs`{{frost-detail-subtab}}`);
    expect(this.$()).to.have.length(1);
  });
});

import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | frost detail tab actions', function() {
  setupComponentTest('frost-detail-tab-actions', {
    integration: true
  });

  it('renders', function() {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    // Template block usage:
    // this.render(hbs`
    //   {{#frost-detail-tab-actions}}
    //     template content
    //   {{/frost-detail-tab-actions}}
    // `);

    this.render(hbs`{{frost-detail-tab-actions}}`);
    expect(this.$()).to.have.length(1);
  });
});

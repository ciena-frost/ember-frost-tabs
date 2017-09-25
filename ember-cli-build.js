/* eslint-env node */
const EmberApp = require('ember-cli/lib/broccoli/ember-addon')

module.exports = function (defaults) {
  var app = new EmberApp(defaults, {
    babel: {
      optional: ['es7.decorators']
    },
    'ember-cli-mocha': {
      useLintTree: false
    },
    sassOptions: {
      includePaths: []
    },
    snippetSearchPaths: [
      'addon',
      'tests/dummy'
    ]
  })

  return app.toTree()
}

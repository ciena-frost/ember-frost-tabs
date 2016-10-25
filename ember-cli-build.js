/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-addon')

module.exports = function (defaults) {
  var app = new EmberApp(defaults, {
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

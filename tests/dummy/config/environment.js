module.exports = function (environment) {
  var ENV = {
    modulePrefix: 'dummy',
    podModulePrefix: 'dummy/pods',
    environment: environment,
    rootURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {}
    },

    APP: {},
    'ember-prop-types': {
      spreadProperty: 'options',
      throwErrors: true,
      validateOnUpdate: true
    }
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.rootURL = '/'
    ENV.locationType = 'none'

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false
    ENV.APP.LOG_VIEW_LOOKUPS = false

    ENV.APP.rootElement = '#ember-testing'
  }

  if (environment === 'production') {
    ENV.rootURL = '/ember-frost-tabs'
  }

  return ENV
}

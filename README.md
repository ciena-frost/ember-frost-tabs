[ci-img]: https://img.shields.io/travis/ciena-frost/ember-frost-tabs.svg "Travis CI Build Status"
[ci-url]: https://travis-ci.org/ciena-frost/ember-frost-tabs

[cov-img]: https://img.shields.io/coveralls/ciena-frost/ember-frost-tabs.svg "Coveralls Code Coverage"
[cov-url]: https://coveralls.io/github/ciena-frost/ember-frost-tabs

[npm-img]: https://img.shields.io/npm/v/ember-frost-tabs.svg "NPM Version"
[npm-url]: https://www.npmjs.com/package/ember-frost-tabs

[ember-observer-badge]: http://emberobserver.com/badges/ember-frost-tabs.svg "Ember Observer score"
[ember-observer-badge-url]: http://emberobserver.com/addons/ember-frost-tabs

[ember-img]: https://img.shields.io/badge/ember-2.3+-orange.svg "Ember 2.3+"

[![Travis][ci-img]][ci-url] [![Coveralls][cov-img]][cov-url] [![NPM][npm-img]][npm-url]

[bithound-img]: https://www.bithound.io/github/ciena-frost/ember-frost-tabs/badges/score.svg "bitHound"
[bithound-url]: https://www.bithound.io/github/ciena-frost/ember-frost-tabs

# ember-frost-tabs
###### Dependencies

![Ember][ember-img]
[![NPM][npm-img]][npm-url]

###### Health

[![Travis][ci-img]][ci-url]
[![Coveralls][cov-img]][cov-url]

###### Security

[![bitHound][bithound-img]][bithound-url]

###### Ember Observer score
[![EmberObserver][ember-observer-badge]][ember-observer-badge-url]

 <b>ember-frost-tabs</b> is a tab addon for Ember.

## Usage

See the demo application for usage information.

* `git clone <name of repo>;`
* `npm install && bower install;`

## Installation

* `ember install ember-frost-tabs`

## API
Detailed API and example usage can be found in the sample application in `tests/dummy`, which is also running at http://ciena-frost.github.io/ember-frost-tabs

| Attribute            | Type             | Required | Value        | Description                                                      |
| -------------------- | ---------------- | -------- | ------------ | ---------------------------------------------------------------- |
| design               | `string`         |          | 'horizontal' | **default** The orientation of the tabs                          |
|                      |                  |          | 'vertical'   |                                                                  |
| tabs                 | `array`          |          |              | A list of tabs                                                   |
| selectedTab          | `string`         |          |              | The tab that will be selected by default                         |
| onChange             | `function`       | &#10004; |              | A callback that runs each time a tab is selected                 |
| hook                 | `string`         | &#10004; |              | The [ember-hook](https://www.npmjs.com/package/ember-hook) value |
| targetOutlet         | `string`         |          |              | The location that the content will be inserted                   |

### Ember-elsewhere

This addon uses the [ember-elsewhere](https://github.com/ef4/ember-elsewhere) to manage the tabs, to put the tab
in the right location

### Testing with ember-hook
This addon has been optimized for use with [ember-hook](https://github.com/Ticketfly/ember-hook). You can set a `hook`
name on your tabs template.
This will allow you to access the internal tabs content for testing.

## Development
### Setup
```
git clone git@github.com:ciena-frost/ember-frost-tabs.git
cd ember-frost-tabs
npm install && bower install
```

### Development Server
A dummy application for development is available under `ember-frost-tabs/tests/dummy`.
To run the server run `ember server` (or `npm start`) from the root of the repository and
visit the app at http://localhost:4200.

### Testing
Run `npm test` from the root of the project to run linting checks as well as execute the test suite
and output code coverage.

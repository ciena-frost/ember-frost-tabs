[ci-img]: https://travis-ci.org/ciena-frost/ember-frost-tabs.svg "Build Status"
[ci-url]: https://travis-ci.org/ciena-frost/ember-frost-tabs

[cov-img]: https://coveralls.io/repos/github/ciena-frost/ember-frost-tabs/badge.svg?branch=master "Code Coverage"
[cov-url]: https://coveralls.io/github/ciena-frost/ember-frost-tabs

[npm-img]: https://img.shields.io/npm/v/ember-frost-tabs.svg "NPM Version"
[npm-url]: https://www.npmjs.com/package/ember-frost-tabs

# ember-frost-tabs <br /> [![Travis][ci-img]][ci-url] [![Coveralls][cov-img]][cov-url] [![NPM][npm-img]][npm-url]



Tabs based off of <a href='https://www.muicss.com/docs/v1/css-js/tabs'>MUI-CSS</a>. Usage is dead simple. `id`'s of frost-tab must match `id` in supplied argument to `frostTabs`. The `id` of the current element is used to toggle `display: none | block`.

## Usage

See the demo application for usage information.

* `git clone <name of repo>;`
* `npm install && bower install;`

## Installation

* `ember install ember-frost-tabs`

## Example
### Template
```handlebars
{{#frost-tabs frostTabs=tabs}}
{{#frost-tab alias='Template' id='template'}}
  ...
{{/frost-tab}}
{{#frost-tab alias='Controller' id='controller'}}
  ...
{{/frost-tab}}
{{#frost-tab id='css' alias='CSS' disabled=true}}
  ...
{{/frost-tab}}
{{/frost-tabs}}
```
### Controller
```javascript
import Ember from 'ember'

export default Ember.Controller.extend({
  queryParams: ['selectedTab'],

  selectedTab: 'controller',

  actions: {
    tabSelected (tab) {
      this.set('selectedTab', tab)
    }
  }
})
```
### Route
```javascript
import Ember from 'ember'

export default Ember.Route.extend({
  queryParams: {
    selectedTab: {
      as: 'tab'
    }
  }
})
```
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

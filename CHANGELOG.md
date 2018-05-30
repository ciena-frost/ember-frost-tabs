# 9.0.1 (2018-05-30)
* **Updated** Pin `ember-cli-notifications` to version `4.2.1` to fix broken demo app

# 9.0.0 (2018-04-13)
* **Upgraded** `ember-frost-core` to `^8.0.0`
* **Installed** `ember-cli-svgstore`
* **Updated** frost-icon functionality to work with new version of `ember-frost-core`

# 8.0.0 (2018-03-21)
* **Updated** pull request template
* **Added** issue template
* **Updated** to `pr-bumper` version `3`
* **Updated** to node 8
* **Added** slack integration
* **Updated** `ember-frost-test` to `^4.0.1`
* **Updated** `ember-test-utils` to `^8.1.1`
* **Updated** `ember-cli-frost-blueprints` to `^5.0.2`
* **Updated** `ember-prop-types` to `^7.0.1`
* **Updated** `ember-frost-core` to `^7.0.0`
* **Removed** ignoring of `package-lock.json` file

# 7.0.1 (2018-01-26)
* **Updated** computed property `isSelected` to use passed parameters

# 7.0.0 (2018-01-18)
* **Added** ignoring of `package-lock` until we are ready to move to node 8
* **Added** ignore the linting of the `CHANGELOG.md`
* **Removed** useLintTree ember-cli-mocha configuration from `ember-cli-build.js`
* **Removed** `.remarkrc` file since it is now provided by `ember-test-utils`
* **Removed** `.template-liintrc.js` since it is now provided by `ember-test-utils`
* **Updated** code coverage to run during `npm run test`
* **Updated** refactored ember-hook usage in `frost-tab.js` to not be a computed property since it needs to be readOnly.
* **Updated** the `isSelected()` computed property to be readOnly to comply with our org's patterns
* **Removed** the blueprint file since packages are now included via dependencies
* **Updated** `bower.json` to no longer have unneeded packages and moved the testing only packages into devDependencies
* **Added** `ember-browserify` @ `^1.2.0`
* **Updated** `ember-frost-test` to `^4.0.0`
* **Updated** `ember-cli-chai` to `0.4.3`
* **Updated** `ember-cli-mocha` to `0.14.4`
* **Updated** `ember-sinon` to `^0.7.0`
* **Updated** `ember-test-utils` to `^8.1.0`
* **Added** `sinon-chai` @ `^2.14.0`
* **Updated** `ember-cli-code-coverage` to `0.3.12`
* **Updated** `ember-cli-frost-blueprints` to `^5.0.1`
* **Updated** `ember-cli-htmlbars-inline-precompile` to `0.3.12`
* **Updated** pin `ember-code-snippet` to `1.7.0`
* **Updated** `ember-cli-sass` to `7.1.1`
* **Updated** `ember-computed-decorators` to `0.3.0` and moved to a dependency instead of a devDependency
* **Updated** `ember-concurrency` to be a dependency instead of a devDependency
* **Updated** `ember-frost-core` to `^5.1.1`
* **Updated** `ember-element-resize-detector` to be a dependency instead of a devDependency
* **Updated** `ember-elsewhere` to be a dependency instead of a devDependency
* **Updated** `ember-hook` to `1.4.2` and moved to a dependency instead of a devDependency
* **Updated** `ember-math-helpers to `2.0.6` and moved to a dependency instead of a devDependency
* **Updated** `ember-prop-types` to `^6.0.1` and moved to a dependency instead of a devDependency
* **Updated** `ember-truth-helpers` to be a dependency instead of a devDependency
* **Removed** unused `ember-spread` package
* **Removed** unused `ember-frost-info-bar` package
* **Removed** `ember-cli-template-lint` package since it is now provided via `ember-test-utils`
* **Updated** code coverage config file to tests/dummy/config/ and add json-summary reporter

# 6.0.4 (2017-12-13)
* Change semver range of `ember-resolver` to align with other repos

# 6.0.3 (2017-12-13)
* Change semver range of `ember-load-initializers` to align with other repos

# 6.0.2 (2017-11-14)
* #71 - Bind context to call of this._super.included() in index.js

# 6.0.1 (2017-11-14)
* Refactor to remove need for `ember-simple-uuid` dependency

# 6.0.0 (2017-11-08)
* Use the latest `ember-frost-core`, with a flexible minor version (`^3.0.1`)


# 5.4.1 (2017-11-02)
* removed two lines of CSS to reduce specificity of style rule targeting the `.tab` class.  Because non-block-format mode has an additional div around each tab, and the CSS was targeting it specifically, block-format tabs were not the same style (larger font, no border, etc) as non-block tabs.


# 5.4.0 (2017-10-02)
- Added detail tabs ( user can choose and add more tabs from a list of tabs).
- A detail tab can have vertical sub tabs with sub tab's content area and related actions in vertical action bar.


# 5.3.1 (2017-09-27)
- Fix a css issue when rendering horizontal tabs inside vertical tabs.



# 5.3.0 (2017-08-25)
- Added option to use a vertical tab.


# 5.2.9 (2017-08-10)
* Ember-CLI 2.12.3 inter-dependencies

# 5.2.8 (2017-07-11)
* Upgrade `ember-cli` to `2.12.3`

# 5.2.7 (2017-05-10)
* **Updated** secure auth token


# 5.2.6 (2017-04-27)
fix styling of tabs.


# 5.2.5 (2017-04-21)
* **Added** blueprint check

# 5.2.4 (2017-03-23)
* **Fixed** `ember` and `ember-cli` dependencies

# 5.2.3
* **Updated** the travis.yml and package.json to run code coverage

# 5.2.2
* **Updated** to use latest pr-bumper which supports being able to set a PR to `none` when publishing a new version is not desired.


# 5.2.1

* **Updated** CI to test in Chrome as well as Firefox.


# 5.2.0

* **Updated** integration tests to remove the deprecated use of `describeComponent()`
* **Added** `ember-test-utils` dependency for usage in testing


# 5.1.2

* **Removed** unused dependencies from the dev environment.


# 5.1.1

* **Upgraded** to test against Ember 2.11.


# 5.1.0

* **Added** additional builds to CI to make sure addon works with latest versions of Ember.
* **Removed** files from npm package that aren't necessary (all of the various config files).
* **Updated** dependencies to latest versions.


# 5.0.2

* **Fixed** `ember-prop-type` errors by following component API's.


# 5.0.1
* **Updated** blueprint with latest core



# 5.0.0
* **Updated** `ember-frost-core` to `^1.0.0`



# 4.1.0
* Move to ember classic structure


# 4.0.0
**upgrade** to node 6.x



# 3.2.0
- Added a contentClass property to `frost-tab` that appends to the `content` div when that tab is selected


# 3.1.0
* Added block format usage


# 3.0.1

* **Added** missing dependencies from blueprints.



# 3.0.0
* **Update** to the lastest depencies (ember@2.8.1, core, etc.)
* **Add** CI tools (code coverage, linting, hook, etc.)
* **Update** the interface to match with the component oiriented approach and to use `elsewhere`
* **Add** integration tests
* **Improve** demo 

# 2.1.0
* Added `tabClassNames` to `frost-tab` interface to allow for specifying CSS classes on tab content elements.

# 2.0.2
No CHANGELOG section found in Pull Request description.
Use a `# CHANGELOG` section in your Pull Request description to auto-populate the `CHANGELOG.md`

# 2.0.1

* **Fixed** deprecation warning from Ember 2.6.0 to stop using `didInitAttrs` hook and instead use `init`.


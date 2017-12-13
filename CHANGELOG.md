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


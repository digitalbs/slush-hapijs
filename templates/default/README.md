#<%= appName %>
<%= appDescription %>

### Developer Suite
* Angular
* Webpack
* Karma
* Jasmine/Sinon
* Node 4.x

### Style Guides
* [javascript (es6)](https://github.com/airbnb/javascript)
* [angular 1.x style guide](https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md)
* [component architecture](https://slides.com/johnnyazee/angularmoderncomponentarch)
* [git flow](http://nvie.com/posts/a-successful-git-branching-model)

The following steps are required in order to contribute to this application

### Install nvm
```
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.30.1/install.sh | bash
nvm install 4
nvm use 4
```
**NOTE: Ensure that you ```nvm use 4``` whenever you start a new terminal.

**NOTE: You may optionally persist this setting using `nvm alias default 4`.**

## Installation

1. Install pre-requisites
```
npm install -g karma karma-cli webpack webpack-dev-server
```
2. Clone this repo
```
git clone <%= appGitRepo %>
cd <%= appName %>
```
3. Install Application Dependencies
Make sure you ran `nvm 4`

```
npm install
```

## Development

### dev-serve mode
This mode starts a webpack-dev-server on your local machine for development purposes. Once running, navigate to *http://localhost:8000*.

You may need to setup your browser to allow for CORS
```
npm run dev-serve
```

Sample `.env`
```
API_URL="https://SOME-THIRD-PARTY-API"
```

#### CORS Override
This is an **optional** step that launches the Chrome browser in a special mode to allow CORS bypass when using dev-serve development mode. It is useful when testing against external third-party APIs.
These aliased commands can be run from the command line.

1. Add the following to your ~/.bash_profile:

```
alias chromekiller="pkill Google Chrome"
alias dangerchrome="open -a 'Google Chrome.app' --args --disable-web-security --allow-running-insecure-content --user-data-dir=''"
```

2. Then:
 ```
 source ~/.bash_profile
 ```

## Distribute Build (Production Ready and CI)
Performs several optimizations such as: minification, compress, de-dupe, chunk and css theme separation.

Generates a ```/distribute``` directory can then be statically hosted using your favorite http server or used in CI for installing the app to production.
```
npm run distribute
```

### Supplemental Information
In distribute mode, the theme (CSS) is split form the main bundle-<hash>.js a theme.css file. The final structure of the index.html will resemble this:

```
<head>
...
<link href="theme.css" rel="stylesheet"></head> //faster than inline css (bundle.js) - loaded in parallel with JS bundles

<body ng-cloak>
<section class="app-wrapper" ui-view="main"></section>
<script src="bundle-0ce882.js"></script> // agility ui runtime and vendors
</body>
```

*Note that js bundles are hashed for uniqueness so browsers refresh their cache*


## Unit Testing
### Full test suite without (no watch)
Runs all Tests without watching. Useful for automation with CI Tools.

#### Headless
Runs tests in PhantomJS only
```
npm run test
```

#### Browser-based
Runs tests in Chrome, Firefox, and PhantomJS
```
npm run test-browsers
```

### TDD Testing
Runs the app in TDD mode. Allows you to watch the code and tests for changes with you TDD.

#### Test Suite by Specific File Path
Runs all the tests for a test  in TDD mode. This is the fastest way to TDD when working on a single file
```
npm run test-tdd -- -f spec/app/components/file.test.js
```

#### Test Suite by Angular Module
Runs all the tests for a single module in TDD mode. Slower than a single file, but useful for multiple tests

For example:
```
npm run test-tdd -- -m AppContext
```
For this mode to work an index.tests.js file must exist in the Module base directory.

#### Test Suite in Browser
Runs tests in specified browsers (Chrome, Firefox, and PhantomJS are supported)
```
npm run test-tdd -- --browsers Chrome,Firefox
```

#### Full Test Suite
Runs all the tests in TDD mode. This mode is very slow but is the complete test suite should you need to TDD this way.
```
npm run test-tdd
```

### Code Coverage Reporting
All tests must be passing for the report to generate. A separate browser window will pop up with the Coverage Report.
*Submitting Code with less than 100% coverage will result in a Build failure.*
```
npm run test-coverage
```

## Maintenance Modes
By default, the node-updates and node-upgrade commands are set to filter out npm-shrinkwrap, to lock it to v200+.
```
npm run node-packages - list installed packages
npm run node-updates - list node that may be outdated.
npm run node-upgrade - updates all the node versions in node.json.
npm run node-purge - removes your node_modules folder.
npm run node-reinstall - removes your node_modules folder and does a npm install.
npm run node-killall - kills all node processes - useful if your webpack-dev-server address is in use
npm run stats - generates build stats that can be analyzed @ http://webpack.github.io/analyse/#hints
```

## Notes

### New Node Modules
If you or someone on the team adds a new node module, you will need to run an `npm install` in order to get the latest node modules. This will not pull down all the node modules, just the ones that were added or updated.

## PR Process

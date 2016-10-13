# enhance-require

<!-- VDOC.badges travis; standard; npm; coveralls -->
<!-- DON'T EDIT THIS SECTION (including comments), INSTEAD RE-RUN `vdoc` TO UPDATE -->
[![Build Status](https://travis-ci.org/vigour-io/enhance-require.svg?branch=master)](https://travis-ci.org/vigour-io/enhance-require)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
[![npm version](https://badge.fury.io/js/descriptors.svg)](https://badge.fury.io/js/descriptors)
[![Coverage Status](https://coveralls.io/repos/github/vigour-io/enhance-require/badge.svg?branch=master)](https://coveralls.io/github/vigour-io/enhance-require?branch=master)

<!-- VDOC END -->

<!-- VDOC.jsdoc enhanceRequire -->
<!-- DON'T EDIT THIS SECTION (including comments), INSTEAD RE-RUN `vdoc` TO UPDATE -->
#### enhanceRequire([options])

In node, modifies the behaviour of `require` so that it ignores paths containing `.css`, `.less`, `.scss`, `.sass`, and any other paths indicated via the `exclude` option.

Outside of node (browserify, webpack, etc.), this function does nothing.
- **[options]** (*object*) - Options to further define the behaviour of `require`:

- + {*boolean*} **options.package** : set to `true` to convert `require('package.json')` to `JSON.parse(require(process.cwd() + '/package.json'))`

- + {*string|regexp|function|array*} **options.exclude** : paths containing the specified string, or matching the specified regexp, or for which specified function returns `true`, will be excluded. If an array is provided, each element is treated exactly the same as `options.exclude` and only paths which aren't excluded by any item will be `require`d.

<!-- VDOC END -->

```javascript
const enhanceRequire = require('enhance-require')
enhanceRequire({
  package: true,
  exclude: '/scratch/'
})
require('styles.less') // ignored in node, processed elsewhere
// Don't forget to add a browserify transform or similar for non-node
var pkg = require('package.json') // pkg is the parsed package from the current working directory
enhanceRequire.restore()
```
# enhance-require
In node, modifies the behaviour of `require` so that it ignores paths containing `.css`, `.less`, `.scss`, `.sass`, and any other paths indicated via the `exclude` option.
Outside of node (browserify, webpack, etc.), this function does nothing.

[![Build Status](https://travis-ci.org/vigour-io/enhance-require.svg?branch=master)](https://travis-ci.org/vigour-io/enhance-require)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
[![npm version](https://badge.fury.io/js/enhance-require.svg)](https://badge.fury.io/js/enhance-require)
[![Coverage Status](https://coveralls.io/repos/github/vigour-io/enhance-require/badge.svg?branch=master)](https://coveralls.io/github/vigour-io/enhance-require?branch=master)

-

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

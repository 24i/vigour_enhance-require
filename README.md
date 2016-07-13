# enhance-require

<!-- VDOC.badges travis; standard; npm; coveralls -->

<!-- VDOC.jsdoc enhanceRequire -->

```javascript
var enhanceRequire = require('enhance-require')
enhanceRequire({
  package: true,
  exclude: '/scratch/'
})
require('styles.less') // ignored in node, processed elsewhere
// Don't forget to add a browserify transform or similar for non-node
var pkg = require('package.json') // pkg is the parsed package from the current working directory
require('')
enhanceRequire.restore()
```
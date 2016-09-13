'use strict'

const path = require('path')
const Module = require('module')
const assert = require('assert')
const originalRequire = Module.prototype.require
module.exports = enhanceRequire

/**
 * @id enhanceRequire
 * @function enhanceRequire
 * In node, modifies the behaviour of `require` so that it ignores paths containing `.css`, `.less`, `.scss`, `.sass`, and any other paths indicated via the `exclude` option.
 * Outside of node (browserify, webpack, etc.), this function does nothing.
 * @param {object} [options] - Options to further define the behaviour of `require`:
 * - + {*boolean*} **options.package** : set to `true` to convert `require('package.json')` to `JSON.parse(require(process.cwd() + '/package.json'))`
 * - + {*string|regexp|function|array*} **options.exclude** : paths containing the specified string, or matching the specified regexp, or for which specified function returns `true`, will be excluded. If an array is provided, each element is treated exactly the same as `options.exclude` and only paths which aren't excluded by any item will be `require`d.
 */

function enhanceRequire (_options) {
  const options = _options || {}
  const require = function require (id) {
    assert(typeof id === 'string', 'path must be a string')
    assert(id, 'missing path')
    var next = () => {
      return Module.prototype.require.next.apply(this, arguments)
    }
    if (exclude(options.exclude, id, next)) {
      return {}
    } else {
      const mapped = options.map && options.map[id]
      if (mapped) {
        if (typeof mapped === 'string') {
          id = mapped
          return originalRequire(path.join(process.cwd(), mapped))
        } else {
          return mapped
        }
      }
      return next(id)
    }
  }
  require.next = Module.prototype.require
  Module.prototype.require = require
}

function exclude (optionsExclude, path) {
  if (optionsExclude) {
    const type = typeof optionsExclude
    if (optionsExclude instanceof Array) {
      let excludeIt = false
      let len = optionsExclude.length
      for (let i = 0; i < len && !excludeIt; i += 1) {
        if (exclude(optionsExclude[i], path)) {
          excludeIt = true
        }
      }
      if (excludeIt) {
        return true
      }
    } else if (type === 'function' && optionsExclude(path)) {
      return true
    } else if (optionsExclude instanceof RegExp && optionsExclude.test(path)) {
      return true
    } else if (type === 'string' && path.indexOf(optionsExclude) !== -1) {
      return true
    }
  }
  if (/\.less/.test(path)) {
    return true
  } else if (/\.css/.test(path)) {
    return true
  } else if (/\.scss/.test(path)) {
    return true
  } else if (/\.sass/.test(path)) {
    return true
  }
  return false
}

/**
 * @id require.restore
 * @function restore
 * Restores the original behaviour or `require`
 */
enhanceRequire.restore = function restoreRequire () {
  Module.prototype.require = originalRequire
}

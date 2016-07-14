'use strict'
const test = require('tape')
const isNode = require('is-node')

test('require', function (t) {
  t.plan(11)
  const enhanceRequire = require('../')
  var count = 0
  try {
    require('./_files/styles.less')
  } catch (e) {
    count += 1
  }
  t.equals(count, isNode ? 1 : 0, "`require('enhance-require')` shouldn't have any effect")

  enhanceRequire()
  try {
    const file = require('./_files/filetorequire')
    t.ok(file.isFile, 'should have required the file normally')
  } catch (e) {
    t.fail('failed to require a normal file:' + e.stack)
  }

  enhanceRequire()
  count = 0
  try {
    require('./_files/styles.less')
    require('./_files/styles.css')
    require('./_files/styles.scss')
    require('./_files/styles.sass')
  } catch (e) {
    count += 1
  }
  t.equals(count, 0, 'makes `require` ignore styles')

  enhanceRequire({
    exclude: '/scratch/'
  })
  count = 0
  try {
    require('./_files/scratch/this-should-be-ignored')
  } catch (e) {
    count += 1
  }
  t.equals(count, 0, 'makes `require` ignore excluded string')

  enhanceRequire({
    exclude: /\/scratch\//
  })
  count = 0
  try {
    require('./_files/scratch/this-should-be-ignored')
  } catch (e) {
    count += 1
  }
  t.equals(count, 0, 'makes `require` ignore excluded regexp')

  enhanceRequire({
    exclude (item) {
      return item.indexOf('/scratch/') !== -1
    }
  })
  count = 0
  try {
    require('./_files/scratch/this-should-be-ignored')
  } catch (e) {
    count += 1
  }
  t.equals(count, 0, 'makes `require` ignore excluded paths')

  enhanceRequire({
    map: {'package.json': { isPackage: true }}
  })
  var pkg
  try {
    pkg = require('package.json')
    t.ok(pkg.isPackage, 'should require the mapped object')
  } catch (e) {
    t.fail('crashed when requiring mapped object')
  }

  enhanceRequire({
    map: {'specialfile': './test/_files/filetorequire'}
  })

  try {
    pkg = require('specialfile')
    t.ok(pkg.isFile, 'should require file using mapped string')
  } catch (e) {
    t.fail('crashed when requiring mapped string')
  }

  enhanceRequire.restore()
  count = 0
  try {
    require('./_files/styles.less')
  } catch (e) {
    count += 1
  }
  t.equals(count, isNode ? 1 : 0, "`require('enhance-require').restore()` should restore the original `require`")

  enhanceRequire({
    exclude: [
      'scratch',
      /nooo/,
      function (item) {
        return item.indexOf('naaay') !== -1
      }
    ]
  })
  count = 0
  try {
    require('./_files/scratch/this-should-be-ignored')
    require('./_files/nooo/this-should-be-ignored')
    require('./_files/naaay/this-should-be-ignored')
  } catch (e) {
    count += 1
  }
  t.equals(count, 0, 'should accept an array of ignores')
  enhanceRequire.restore()

  count = 0
  try {
    require('path')
  } catch (e) {
    console.log('e', e.stack)
    count += 1
  }
  t.equals(count, 0, "`require('enhance-require').restore()` should restore `require`s default behaviour")
})

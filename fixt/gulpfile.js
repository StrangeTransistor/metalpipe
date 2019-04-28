
require = require('esm')(module)

require('console-ultimate')


var rootpath = require('@streetstrider/rootpath')

var { parallel } = require('gulp')

var is_prod = require('../util/is-prod').default


var $root = rootpath()

var $from = $root.partial('lib')
var $to   = $root.partial('release', is_prod() && 'prod' || 'dev')

console.log('To:', $root.relative($to))

var Css = require('../rule/css').default


var css = Css({ $from, $to })

exports.default = parallel(css)


require = require('esm')(module)

require('console-ultimate')


var rootpath = require('@streetstrider/rootpath')

var { parallel } = require('gulp')

var is_final = require('../util/is-final').default


var $root = rootpath()

var $from = $root.partial('lib')
var $to   = $root.partial('release', is_final() && 'final' || 'dev')

var fromto = { $from, $to }

console.log('To:', $root.relative($to))

var Css = require('../rule/css').default
var Html = require('../rule/html').default
var JavaScript = require('../rule/javascript').default


var css = Css(fromto)
var html = Html(fromto)
var javascript = JavaScript(fromto)

exports.default = parallel(css, html, javascript)

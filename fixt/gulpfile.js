
require = require('esm')(module)

require('console-ultimate')



var { parallel } = require('gulp')

var Context = require('../util/Context').default

var context = Context()

console.log('To:', context.$root.relative(context.$to))

var Css = require('../rule/css').default
var Html = require('../rule/html').default
var JavaScript = require('../rule/javascript').default


var css = Css(context)
var html = Html(context)
var javascript = JavaScript(context)

exports.default = parallel(css, html, javascript)

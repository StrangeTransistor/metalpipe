
require('console-ultimate')


var { parallel } = require('gulp')

var Context = require('../util/Context')

var context = Context()

console.log('To:', context.$root.relative(context.$to))

var Css = require('../rule/css')
var Html = require('../rule/html')
var JavaScript = require('../rule/javascript')


var css = Css(context)
var html = Html(context)
var javascript = JavaScript(context)

exports.default = parallel(css, html, javascript)

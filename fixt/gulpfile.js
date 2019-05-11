
require('console-ultimate')


var { parallel } = require('gulp')


var Css = require('../rule/css')
var Html = require('../rule/html')
var JavaScript = require('../rule/javascript')
var Digest = require('../rule/digest')

var Context = require('../util/Context')
var context = Context()
context.describe()


var css = Css(context)
var html = Html(context)
var javascript = JavaScript(context)
var digest = Digest(context)

exports.default = parallel(css, html, javascript, digest)

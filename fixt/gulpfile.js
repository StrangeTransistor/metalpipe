
require('console-ultimate')


var gulp = require('gulp')


var Context  = require('../Context')
var Frontend = require('../prefab/frontend')


var context = Context()

context.gulp = gulp

exports.default = Frontend(context)


require('console-ultimate')


var Context  = require('metalpipe/Context')
var Frontend = require('metalpipe/release/frontend')


exports.default = Frontend(Context({ gulp: require('gulp') }))

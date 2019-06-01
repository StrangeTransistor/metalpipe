
require('console-ultimate')


var Context  = require('metalpipe/Context')
var Frontend = require('metalpipe/prefab/frontend')


exports.default = Frontend(Context({ gulp: require('gulp') }))

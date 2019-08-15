
require('console-ultimate')


var Context = require('metalpipe/Context')
var Backend = require('metalpipe/release/backend')


exports.default = Backend(Context({ gulp: require('gulp') }))

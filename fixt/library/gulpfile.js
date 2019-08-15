
require('console-ultimate')


var Context = require('metalpipe/Context')
var Library = require('metalpipe/release/library')


exports.default = Library(Context({ gulp: require('gulp') }))

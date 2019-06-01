
require('console-ultimate')


var Context  = require('../../Context')
var Backend = require('../../prefab/backend')


exports.default = Backend(Context({ gulp: require('gulp') }))

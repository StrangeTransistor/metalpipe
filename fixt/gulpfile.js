
require('console-ultimate')


var Context  = require('../Context')
var Frontend = require('../prefab/frontend')


exports.default = Frontend(Context())

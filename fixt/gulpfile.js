
require('console-ultimate')


var Frontend = require('../prefab/frontend')

var Context = require('../util/Context')
var context = Context()
context.describe()


exports.default = Frontend(context)

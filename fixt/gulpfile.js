
require = require('esm')(module)

require('console-ultimate')


var rootpath = require('@streetstrider/rootpath')

var is_prod = require('../util/is-prod').default


var $from = rootpath()
var $to = $from.partial('release', is_prod() && 'prod' || 'dev')


exports.default = async () =>
{
	console.log('Hello')
	console.log($from())
	console.log($to())
}

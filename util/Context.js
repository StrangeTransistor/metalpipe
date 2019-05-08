
var rootpath = require('./rootpath')
var is_final = require('./is-final')


module.exports = function Context ()
{
	var $root = rootpath()

	var $from = $root.partial('lib')
	var $to   = $root.partial('release', is_final() && 'final' || 'dev')

	var context = { $root, $from, $to }

	return context
}

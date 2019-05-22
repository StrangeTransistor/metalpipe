
var minimist = require('minimist')

var rootpath = require('./util/rootpath')
var Package  = require('./util/Package')
var Notify   = require('./util/Notify')


module.exports = function Context ()
{
	var opts = minimist(process.argv.slice(2))

	var $root = rootpath()

	var $from = $root.partial('lib')
	var $to   = $root.partial('release', (opts.final && 'final' || 'dev'))

	var notify = Notify()

	function describe ()
	{
		console.info('To:', $root.relative($to))
		console.info(opts)
	}

	var context =
	{
		package: Package($root),
		$root, $from, $to,
		opts,
		describe,
		notify,
	}

	return context
}

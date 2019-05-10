
var minimist = require('minimist')

var rootpath = require('./rootpath')


module.exports = function Context ()
{
	var opts = minimist(process.argv.slice(2))

	var $root = rootpath()

	var $from = $root.partial('lib')
	var $to   = $root.partial('release', (opts.final && 'final' || 'dev'))

	function describe ()
	{
		console.info('To:', $root.relative($to))
		console.info(opts)
	}

	var context =
	{
		$root, $from, $to,
		opts,
		describe,
	}

	return context
}

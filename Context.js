
var minimist = require('minimist')

var rootpath = require('./util/rootpath')
var fallback = require('./util/get-fallback')

var ExportOpts = require('./util/ExportOpts')
var Package = require('./util/Package')
var Notify  = require('./util/Notify')
var Other   = require('./util/Other')


module.exports = function Context (options)
{
	options || (options = {})

	var gulp = options.gulp
	if (! gulp)
	{
		console.warn(`Context needs gulp instance`)
		gulp = require('gulp')
	}

	var
	opts = options.preoptions
	opts = { ...opts, ...minimist(process.argv.slice(2)) }

	opts.final = (!! opts.final)
	opts.dev   = (!  opts.final)
	opts.test  = fallback(opts, 'test', () => opts.dev)

	opts.clean = fallback(opts, 'clean', () => opts.final)

	var $root = rootpath()
	var $from = $root.partial()

	var base = fallback(opts, 'to-base', () => 'release/')
	var to   = fallback(opts, 'to', () => (opts.final && 'final' || 'dev'))
	var rel  = fallback(opts, 'to-rel', () => '')
	var $to  = $root.partial(base, to, rel)

	var ignore = opts.ignore

	var pkg = Package($root)
	var exp_opts = ExportOpts(opts, pkg)
	var notify = Notify()
	var other = Other({ ignore, ignore_test: (! opts.test) })

	function describe ()
	{
		console.info('To:', $root.relative($to))
		console.info(opts)
	}

	var context =
	{
		package: pkg,
		gulp,
		$root, $from, $to,
		opts,
		describe,
		exp_opts,
		notify,
		other,
	}

	return context
}

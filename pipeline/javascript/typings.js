
var { src } = require('gulp')
var { dest: dst } = require('gulp')
var nothing = require('../../unit/nothing')

var Fileset = require('../../util/Fileset')
// var live = require('../../util/live')


module.exports = function Typings (context)
{
	if (! context.typescript)
	{
		return function TYPINGS ()
		{
			return nothing().end()
		}
	}

	var { $from, $to } = context
	var ignored = context.other.ignored.negate().view()

	var glob =
	[
		'**/*.ts',
		'!**/*.d.ts',
		'!test/**',
		'!tests/**',
	]
	var from = Fileset(glob, ignored).base($from).view()

	var GulpTs = require('gulp-typescript')

	var project = GulpTs.createProject(
	{
		declaration: true,
		/* noEmit: true, */
		emitDeclarationOnly: true,
		/* typescript: require('typescript'), */
	})

	return function TYPINGS ()
	{
		var reporter = GulpTs.reporter.nullReporter()

		// TODO: live typings

		/*
		//return live(context, from, function typings$ ()
		//{
		//})
		*/

		/*
		var ts = GulpTs(
		{
			declaration: true,
			emitDeclarationOnly: true
		}
		, reporter)
		*/

		var { dts: d_ts } = src(from)
		.pipe(project(reporter))
		.on('error', e =>
		{
			if (e?.message?.match(/TypeScript: Compilation failed/)) { return }
			throw e
		})

		return d_ts.pipe(dst($to()))
	}
}

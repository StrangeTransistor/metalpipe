
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

	var Typescript = require('gulp-typescript')

	/*
	var ts = Typescript.createProject($from('tsconfig.json'),
	{
		declaration: true,
		emitDeclarationOnly: true,
		// typescript: require('typescript'),
	})
	//*/

	return function TYPINGS ()
	{
		// TODO: live typings
		//return live(context, from, function typings$ ()
		//{
			var ts = Typescript(
			{
				declaration: true,
				emitDeclarationOnly: true
			}
			, Typescript.reporter.nullReporter())
			//*/

			var streams = src(from)
			.pipe(ts)
			.on('error', () => {})

			return streams.dts.pipe(dst($to()))
		//})
	}
}

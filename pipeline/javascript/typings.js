
var { src } = require('gulp')
var { dest: dst } = require('gulp')
var nothing = require('../../unit/nothing')

// var live = require('../../util/live')


module.exports = function Typings (context, { ignore })
{
	if (! context.typescript)
	{
		return function TYPINGS ()
		{
			return nothing().end()
		}
	}

	var ignored = ignore.view()

	var { $from, $to } = context

	var glob =
	[
		'**/*.ts',
		'!**/*.d.ts',
		'!test/**',
		'!tests/**',
		...ignored,
	]

	glob = glob.map(glob => $from(glob))

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
		//return live(context, glob, function typings$ ()
		//{
			var ts = Typescript(
			{
				declaration: true,
				emitDeclarationOnly: true
			}
			, Typescript.reporter.nullReporter())
			//*/

			var streams = src(glob)
			//.pipe(ts())
			.pipe(ts)
			.on('error', () => {})

			return streams.dts.pipe(dst($to()))
		//})
	}
}

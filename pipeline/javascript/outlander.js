// TODO: clear files (iop, autolint, comments, spaces)

function RequireConsole (mod)
{
	var ultimate = console
	console = require('console')

	try
	{
		return require(mod)
	}
	finally
	{
		console = ultimate
	}
}

// var { ESLint } = require('eslint')
// var eslint = RequireConsole('@rollup/plugin-eslint')
// var { obj: through } = require('through2')
// var outlander = require('js-outlander')

var mpipe  = require('multipipe')
var eslint = RequireConsole('gulp-eslint')

module.exports = () =>
{
	return mpipe(
		eslint(
		{
			quiet: () => false,
			useEslintrc: false,
			configFile: require.resolve('./eslintrc'),
			fix: true,
		}),
		eslint.formatEach(),
	)
}

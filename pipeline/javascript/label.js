// TODO: label bundle, minify

var strip = require('@rollup/plugin-strip')


module.exports = (context) =>
{
	var labels = new Set([ 'dev', 'test', 'final' ])

	var { opts } = context
	if (opts.dev)   labels.delete('dev')
	if (opts.final) labels.delete('final')
	if (opts.test)  labels.delete('test')

	labels = [ ...labels ]

	return strip(
	{
		include: '**/*.(js|ts|jsx|tsx)',
		labels,
		sourceMap: true,
		debugger:  (! opts.test),
		functions: [],
	})
}

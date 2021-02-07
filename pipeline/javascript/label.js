
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
		include: '**/*.(js|ts)',
		labels,
		sourceMap: true,
		debugger:  true,
		functions: [],
	})
}

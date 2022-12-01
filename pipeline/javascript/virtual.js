
module.exports = function virtual (context)
{
	var virtual = require('@rollup/plugin-virtual')

	var mod = context.exp_opts
	.as_pairs()
	.map(([ key, value ]) => `export const ${ key } = ${ JSON.stringify(value) }`)
	.join('\n')

	return virtual({ '~metalpipe': mod })
}

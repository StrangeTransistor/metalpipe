
module.exports = function virtual (context)
{
	var virtual = require('@rollup/plugin-virtual')

	var mod = context.exp_opts
	.as_pairs()
	.map(([ key, value ]) => `export const ${ key } = ${ repr(value) }`)
	.join('\n')

	return virtual({ '~metalpipe': mod })
}


function repr (value)
{
	try
	{
		return JSON.stringify(value)
	}
	catch (e) {}
	try
	{
		return String(value)
	}
	catch (e)
	{
		return ''
	}
}

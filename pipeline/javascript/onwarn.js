

module.exports = function onwarn (warning)
{
	if (warning.code === 'THIS_IS_UNDEFINED') return
	// https://github.com/rollup/rollup/blob/master/src/rollup/types.d.ts
	// console.log(warning.chunk)
	console.debug('Rollup (%s): %s', warning.code, warning.toString())
}

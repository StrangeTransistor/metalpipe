

module.exports = function onwarn (warning)
{
	// https://github.com/rollup/rollup/blob/master/src/rollup/types.d.ts
	// console.log(warning.chunk)
	console.debug('Rollup (%s): %s', warning.code, warning.toString())
}

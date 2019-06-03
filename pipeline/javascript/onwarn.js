

module.exports = function onwarn (warning)
{
	console.debug('Rollup: %s (%s)', warning.toString(), warning.code)
}

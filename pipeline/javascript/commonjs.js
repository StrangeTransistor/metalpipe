
module.exports = function commonjs ()
{
	var commonjs = require('@rollup/plugin-commonjs')

	return commonjs(
	{
		requireReturnsDefault: 'preferred', /* auto */
	})
}

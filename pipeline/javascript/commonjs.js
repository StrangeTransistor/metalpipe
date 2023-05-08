/*
 https://github.com/rollup/plugins/tree/master/packages/commonjs/
*/

module.exports = function commonjs ()
{
	var commonjs = require('@rollup/plugin-commonjs')

	return commonjs(
	{
		requireReturnsDefault: 'preferred', /* auto */
		defaultIsModuleExports: true, /* auto */
	})
}

// TODO: rm cjs
// --cjs      - [bool]   - ignore module field, prefer main/browser field for frontend, compatibility with synthetic imports (mostly for React plugins to work) = false

module.exports = function node_resolve (/* context */)
{
	var resolve = require('@rollup/plugin-node-resolve').default

	var mainFields = [ 'browser', 'module', 'main' ]
	/*if (context.opts.cjs)
	{
		mainFields = [ 'browser', 'main' ]
	}
	*/

	return resolve(
	{
		mainFields,
		// TODO: extset
		extensions: [ '.tsx', '.ts', '.jsx', '.js' ],
	})
}

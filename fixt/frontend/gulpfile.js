
exports.default = require('metalpipe/prefab')('frontend', require('gulp'),
{
	vars (opts, pkg)
	{
		var custom_opt = ((opts.hash || 'HASH') + '_' + pkg.version)
		var custom_at = 'foo@barbarbar'
		var custom_dot = { foo: { bar: 'baz@baz' }}

		return { custom_opt, custom_at, custom_dot }
	},
})

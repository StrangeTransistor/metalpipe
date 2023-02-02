
exports.default = require('metalpipe/prefab')('backend', require('gulp'),
{
	'bundle-deps': [ 'noop3' ],

	vars (opts, pkg)
	{
		var custom_opt = ((opts.hash || 'HASH') + '_' + pkg.version)

		return { custom_opt }
	},
})

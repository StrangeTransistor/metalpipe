
exports.default = require('metalpipe/prefab')('library', require('gulp'),
{
	vars (opts, pkg)
	{
		var custom_opt = ((opts.hash || 'HASH') + '_' + pkg.version)

		return { custom_opt }
	},
})

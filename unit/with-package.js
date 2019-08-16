

module.exports = function WithPackage (context, fn)
{
	var p = context.package

	if (! p)
	{
		var nothing = require('./nothing')

		console.warn('WithPackage: No package.json found')

		return nothing()
	}

	var p = fn(p, context)

	if (! p)
	{
		var nothing = require('./nothing')

		console.warn('WithPackage: transform fn eliminated package.json')

		return nothing()
	}

	var file = require('gulp-file')
	var { dump } = require('../util/json')

	return file('package.json', dump(p), { src: true })
}

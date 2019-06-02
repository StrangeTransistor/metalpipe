
var noop = require('gulp-noop')
var file = require('gulp-file')

var { dump } = require('../util/json')


module.exports = function WithPackage (context, fn)
{
	var p = context.package

	if (! p)
	{
		console.warn('WithPackage: No package.json found')

		return noop()
	}

	var p = fn(p, context)

	if (! p)
	{
		console.warn('WithPackage: transform fn eliminated package.json')

		return noop()
	}

	return file('package.json', dump(p), { src: true })
}

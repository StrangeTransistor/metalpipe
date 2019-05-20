
var assert = require('assert')

var { src } = require('gulp')

var rm = require('gulp-clean')


module.exports = function clean ({ $to })
{
	assert($to().match(/release/), 'must be `/release/*` destination')

	return function CLEAN ()
	{
		return src($to('*'), { read: false })
		.pipe(rm())
	}
}

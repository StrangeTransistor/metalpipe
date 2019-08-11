
var { dest: dst } = require('gulp')

var with_package = require('../unit/with-package')


module.exports = function WithPackage (context, fn)
{
	return function PACKAGE ()
	{
		var { $to } = context

		return with_package(context, fn)
		.pipe(dst($to()))
	}
}

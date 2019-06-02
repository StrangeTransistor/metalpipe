
var { dest: dst } = require('gulp')

var with_package = require('../unit/with-package')


module.exports = function WithPackage (context)
{
	return function PACKAGE ()
	{
		var { $to } = context

		return with_package(context, backend)
		.pipe(dst($to()))
	}
}


function backend (p /*, context */)
{
	return p
}

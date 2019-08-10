
var { dest: dst } = require('gulp')

var with_package = require('../../unit/with-package')


module.exports = function WithPackage (context)
{
	return function PACKAGE ()
	{
		var { $to } = context

		return with_package(context, backend)
		.pipe(dst($to()))
	}
}


function backend (p, context)
{
	if (context.opts.final)
	{
		delete p.devDependencies

		if (p.scripts)
		{
			delete p.scripts.test
		}

		var script_patch = p['scripts:final']
		delete p['scripts:final']
		if (script_patch)
		{
			p.scripts = { ...p.scripts, ...script_patch }
		}
	}

	return p
}

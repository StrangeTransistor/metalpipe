
var with_package = require('../with-package')


module.exports = function WithPackage (context)
{
	return with_package(context, (p, context) =>
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

		if (context.opts.esm)
		{
			p.type = 'module'
		}

		return p
	})
}


var with_package = require('../with-package')


module.exports = function WithPackage (context)
{
	return with_package(context, (p, context) =>
	{
		if (context.opts.final)
		{
			delete p.private
			delete p.devDependencies
			delete p.scripts
		}

		return p
	})
}

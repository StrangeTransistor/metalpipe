
var sucrase = require('rollup-plugin-sucrase')


module.exports = ({ typescript }) =>
{
	var transforms = [ 'flow' ]

	if (typescript)
	{
		transforms = [ 'typescript' ]
	}

	return sucrase({ transforms })
}

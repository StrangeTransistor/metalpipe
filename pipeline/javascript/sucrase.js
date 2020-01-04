// TODO: impr jsx (pragma, imports ext)

var sucrase = require('@rollup/plugin-sucrase')


module.exports = ({ typescript }) =>
{
	var transforms = [ 'jsx' ]

	if (typescript)
	{
		transforms = [ ...transforms, 'typescript' ]
	}
	else
	{
		transforms = [ ...transforms, 'flow' ]
	}

	return sucrase(
	{
		production: true,
		transforms,
	})
}

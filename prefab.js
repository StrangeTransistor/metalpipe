

module.exports = function prefab (name, gulp, preoptions)
{
	require('console-ultimate')

	console.info('Prefab:', name)

	var Context = require('./Context')
	var Release = require('./release/' + name)

	return Release(Context({ gulp, preoptions }))
}

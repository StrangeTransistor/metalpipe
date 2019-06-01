
var rootpath = require('../../util/rootpath')


module.exports = (...args) =>
{
	return rootpath(__dirname, '../../', ...args)
}

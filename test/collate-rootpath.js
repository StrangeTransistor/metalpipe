
var rootpath = require('../util/rootpath')


module.exports = (name) =>
{
	return rootpath(__dirname, './collate', name)
}

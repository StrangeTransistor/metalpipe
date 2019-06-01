
var { tmpdir } = require('os')
var random = require('randomstring').generate

var rootpath = require('../util/rootpath')


module.exports = () =>
{
	return rootpath(tmpdir(), 'metalpipe', random(8))
}


require('console-ultimate')

var hash = require('./util/hash-stamp').in_uri


var uris =
[
	'/static/index.css',
	'/static/index.js',
	'static/index.js',
	'/static/assets/foo/bar.jpg',
	'static/assets/foo/bar.jpg',
	'/api/get.js',
	'http://d.org/api/get/',
]

uris = uris.map(hash('abcdef'))


for (let uri of uris)
{
	console.log(uri)
}

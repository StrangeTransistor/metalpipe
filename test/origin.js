
var tmp_rootpath  = require('./tmp-rootpath')
var fixt_rootpath = require('./fixt-rootpath')


module.exports = (name) =>
{
	var tmp  = tmp_rootpath()
	var fixt = fixt_rootpath(name)

	console.warn(tmp())
	console.warn(fixt())
}

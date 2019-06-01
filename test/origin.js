
var tmp_rootpath  = require('./tmp-rootpath')
var fixt_rootpath = require('./fixt-rootpath')

var { copySync: cp } = require('fs-extra')


module.exports = (name) =>
{
	var tmp  = tmp_rootpath()
	var fixt = fixt_rootpath(name)

	cp(fixt(), tmp())

	console.info('Origin: from `%s` to `%s`', fixt(), tmp())

	return tmp
}

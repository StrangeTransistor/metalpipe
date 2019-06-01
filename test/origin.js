
var { copySync: cp } = require('fs-extra')
var { ensureSymlinkSync: ln } = require('fs-extra')

var rootpath      = require('./rootpath/metalpipe')
var tmp_rootpath  = require('./rootpath/tmp')
var fixt_rootpath = require('./rootpath/fixt')


module.exports = (name) =>
{
	var root = rootpath()
	var tmp  = tmp_rootpath()
	var fixt = fixt_rootpath(name)

	cp(fixt(), tmp())

	ln(root('node_modules/gulp'), tmp('node_modules/gulp'))
	ln(root('node_modules/metalpipe'), tmp('node_modules/metalpipe'))
	ln(root('node_modules/console-ultimate'), tmp('node_modules/console-ultimate'))

	ln(root('.git'), tmp('.git'))

	console.info('Origin: from `%s` to `%s`', fixt(), tmp())

	return tmp
}

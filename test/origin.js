
var console = require('console-ultimate/default')

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

	/* generic */
	ln(root('node_modules'), tmp('../node_modules'))

	/* this */
	cp(fixt(), tmp(),
	{
		filter (path)
		{
			return (! path.match('node_modules'))
		}
	})
	ln(root('.git'), tmp('.git'))
	ln(fixt('node_modules'), tmp('node_modules'))

	console.info('Origin: from `%s` to `%s`', fixt(), tmp())

	return tmp
}

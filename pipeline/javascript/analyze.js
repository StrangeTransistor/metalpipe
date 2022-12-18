
var az = require('rollup-plugin-analyzer')


module.exports = function analyze (context)
{
	return az(
	{
		root: context.$root(),
		stdout: true,
		limit: 5,
		summaryOnly: true,
		showExports: true,
		transformModuleId: Transform(context),
	})
}

function Transform (context)
{
	var root_nm = context.$root('node_modules')
	var nm = '/~n_m/'

	return (id) =>
	{
		id = id.replace(new RegExp(`^${ root_nm }/`), nm)
		// id = id.replace(/^.*?\/node_modules\//, nm)
		id = id.replace(/\/node_modules\//g, '/~n_m/')

		return id
	}
}

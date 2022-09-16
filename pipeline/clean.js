
// var assert = require('assert')
var del = require('del')


module.exports = function clean ({ opts, $to })
{
	// assert($to().match(/release/), 'must be `/release/*` destination')

	return function CLEAN ()
	{
		if (! opts.clean)
		{
			return Promise.resolve()
		}

		if (! $to().match(/release/))
		{
			console.warn('clean: destination is not `release/*`, skip clean')

			return Promise.resolve()
		}

		return del($to('*'))
		.catch((e) =>
		{
			console.warn('clean: cannot clean due to safety restrictions, skip clean')
			console.warn(e)
		})
	}
}


var eos = require('end-of-stream')


module.exports = function series (t1, t2)
{
	return () => new Promise((rs, rj) =>
	{
		eos(t1(), (e) =>
		{
			if (e) { return rj(e) }

			eos(t2(), (e) =>
			{
				if (e) { return rj(e) }

				return rs()
			})
		})
	})
}

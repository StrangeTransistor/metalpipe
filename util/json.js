

exports.load = function load (_)
{
	return JSON.parse(_)
}


exports.dump = function dump (_)
{
	return JSON.stringify(_, null, '  ')
}



module.exports.load = function load (_)
{
	return JSON.parse(_)
}


module.exports.dump = function dump (_)
{
	return JSON.stringify(_, null, '  ')
}


module.exports =
{
	root: true,

	extends: require.resolve('js-outlander'),

	rules:
	{
		'no-debugger': 0,

		'node/exports-style': 0,
		'node/no-extraneous-require': 0,
		'node/no-unpublished-require': 0,
		'node/no-missing-import': 0,

		// '@typescript-eslint/no-unused-expressions': 0,
	},
}

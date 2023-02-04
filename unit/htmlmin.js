// TODO: minifier options
// TODO: include engine

var min = require('gulp-htmlmin')


module.exports = function htmlmin ()
{
	return min(
	{
		collapseWhitespace: true,
		// conservativeCollapse: true,
		// collapseInlineTagWhitespace: true, // eslint-disable-line id-length

		removeComments: true,

		removeEmptyAttributes: true,
		collapseBooleanAttributes: true,

		quoteCharacter: "'",
	})
}

//		// ignoreCustomFragments: [ /\{\{.*?\}\}/, /\{%.*?%\}/ ],
//		ignoreCustomFragments: [ /\{%.*?%\}/ ],
//		// customAttrSurround: [ /\{\{.*?\}\}/, /\{%.*?%\}/ ],
//		trimCustomFragments: true,
//
//		decodeEntities: true,
//		sortAttributes: true,
//		// sortClassName: true,
//		useShortDoctype: true,
//
//		/* minifyCSS */
//		/* minifyJS */

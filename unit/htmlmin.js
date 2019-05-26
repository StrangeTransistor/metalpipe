
var min = require('gulp-htmlmin')


module.exports = function htmlmin ()
{
	return min(
	{
		collapseWhitespace: true,
		collapseInlineTagWhitespace: true, // eslint-disable-line id-length

		removeComments: true,
		removeEmptyAttributes: true,

		// maxLineLength: 80,
		quoteCharacter: "'",
	})
}


//		collapseBooleanAttributes: true,
//
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

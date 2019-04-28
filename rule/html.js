
var { src } = require('gulp')
var { dest: dst } = require('gulp')


import pug from '../unit/pug'

import live from '../util/live'


export default function html ({ $from, $to })
{
	return function HTML ()
	{
		return live($from('**/*.pug'), function html$ ()
		{
			return src($from('index/*.pug'))
			.pipe(pug({ $from }))
			.pipe(dst($to()))
		})
	}
}

//
//function html ()
//{
//	var glob = $from('lib/**/*.html')
//	var glob_macro = $from('!lib/**/*.macro.html')
//
//	return live(glob, function html$ ()
//	{
//		return src([ glob, glob_macro ])
//		.pipe(rigger())
//		.pipe(htmlmin())
//		.pipe(dest($to('templates/')))
//	})
//}
//
//function rigger ()
//{
//	return require('gulp-rigger')({ cwd: $from('lib/') })
//}
//
//function htmlmin ()
//{
//	return require('gulp-htmlmin')(
//	{
//		collapseBooleanAttributes: true,
//
//		collapseWhitespace: true,
//		collapseInlineTagWhitespace: true,
//
//		removeComments: true,
//		removeEmptyAttributes: true,
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
//
//		maxLineLength: 80,
//		quoteCharacter: "'",
//	})
//}

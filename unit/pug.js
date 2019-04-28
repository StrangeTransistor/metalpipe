
import gulp_pug from 'gulp-pug'


export default function pug ({ $from })
{
	return gulp_pug({ basedir: $from() })
}

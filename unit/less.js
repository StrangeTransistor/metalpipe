
import gulp_less from 'gulp-less'


export default function less ({ $from })
{
	return gulp_less({ paths: $from() })
}

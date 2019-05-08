
import rootpath from './rootpath'
import is_final from './is-final'


export default function Context ()
{
	var $root = rootpath()

	var $from = $root.partial('lib')
	var $to   = $root.partial('release', is_final() && 'final' || 'dev')

	var context = { $root, $from, $to }

	return context
}


import is_argv from './is-argv'


export default function is_prod ()
{
	return is_argv('--prod')
}

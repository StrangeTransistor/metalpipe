
import { watch } from 'gulp'


import is_final from './is-final'
import is_once from './is-once'


export default function live (glob, task)
{
	if (is_final() || is_once())
	{
		return task()
	}
	else
	{
		return watch(glob, { ignoreInitial: false }, task)
	}
}

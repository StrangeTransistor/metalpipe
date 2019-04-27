
import { watch } from 'gulp'


import is_prod from './is-prod'
import is_once from './is-once'


export default function live (glob, task)
{
	if (is_prod() || is_once())
	{
		return task()
	}
	else
	{
		return watch(glob, { ignoreInitial: false }, task)
	}
}

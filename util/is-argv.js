
export default function is_argv (value)
{
	return (!! (~ process.argv.indexOf(value)))
}

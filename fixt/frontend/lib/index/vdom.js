
export function A ()
{
	return <div className='foo'>Foo
	</div>
}

export function B ({ prop })
{
	return <div className={ prop } />
}

export function C (props)
{
	return <>
		<div className='foo' />
		<B prop={ 'bar' } { ...props } />
	</>
}

import Link from 'next/link'
import React from 'react'

type Props = {}

const page = (props: Props) => {
  return (
    <div className='justify-center'>
      <Link href={'/products'}><h1 className='text-3xl px-32 text-white'>Products</h1></Link>
    </div>
  )
}

export default page
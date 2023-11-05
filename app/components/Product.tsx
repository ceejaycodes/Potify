import React from 'react';
import Image from 'next/image';
import formatPrice from '@/utils/PriceFormat';
import Link from 'next/link';
 export interface CartProps{
    id: string,
    name: string,
    quantity: number | 1,
    image: string,
    description: string | null,
    unit_amount: number | null
}

const Product = ({id, name, image,unit_amount,quantity, description}: CartProps) => {
  // console.log({id, name, image,unit_amount, description})

  return (
    <>
    <Link href={{ pathname: `/product/${id}`, query: {name, image, id, unit_amount, quantity ,description} }}>
        <div className='block mt-4 ml-8'>
        <Image src={image} alt  ={name} height={800} width={800} className='w-96 h-36 my-6 rounded-3xl object-cover'/>
        <h3>{name.charAt(0).toUpperCase() + name.slice(1)}</h3>
        <h5>{unit_amount != null ? formatPrice(unit_amount) : 'NA'}</h5>
        </div>
      </Link>
    </>
  )
}

export default Product
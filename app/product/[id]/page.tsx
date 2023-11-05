import React from 'react';
import Image from 'next/image';
import formatPrice from '@/utils/PriceFormat';
import AddToCart from '../AddToCartButton';

 interface Params {
    id: string
 }

interface SearchParams{
    name: string,
    image: string,
    id: number,
    quantity: number | 1,
    description: string | null
    unit_amount: number
    
}

interface SearchParamTypes{
    Params: Params,
    searchParams: SearchParams


}

const page =  async ({searchParams}: SearchParamTypes) => {
    // console.log(searchParams)
  return (
    <>
    <div className='flex m-2 mt-11 '>
        <div className=' basis-2/4'>
            <Image src={searchParams.image} alt={searchParams.name} width={400} height={400} className='w-full'/>
        </div>
        <div className='flex-col gap-4 pl-12 basis-2/4'>
            <strong className='text-white'> <h1>{searchParams.name}</h1></strong>
             <h3>{searchParams.description}</h3>
            <strong><p>{searchParams.unit_amount && formatPrice(searchParams.unit_amount)}</p> </strong>
            <AddToCart {...searchParams} />
        </div>

    </div>
    </>
  )
}

export default page;
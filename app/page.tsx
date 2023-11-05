import React from 'react';
import Stripe from 'stripe';
import Product from './components/Product';

const getProducts = async() => {
  const stripe = new Stripe(process.env.SECRET_KEY as string, {
    apiVersion: "2022-11-15"
  })

  const products = await stripe.products.list()

  const productsWithPrices = await Promise.all(
    products.data.map(async(product) => {
      const prices = await stripe.prices.list({product: product.id})
      return{
        id: product.id,
        name: product.name,
        unit_amount: prices.data[0].unit_amount,
        images: product.images[0],
        description: product.description,
        // quantity: product.quantity,
        currency: prices.data[0].currency,

      }
    })
  )

  return productsWithPrices

}

type Props = {}

const page = async (props: Props) => {
  const products = await getProducts()



  return (
    <main className='grid grid-cols-fluid'>
   {products?.map((product) => (
    <Product key={product.id} name={product.name} image={product.images} unit_amount={product.unit_amount} id={product.id} quantity={0} description={product.description}/>
    // <h1>test</h1>
   ))}

    </main>
  )
}

export default page;
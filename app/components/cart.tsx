'use client';
import Image from 'next/image';
import {  useCartStore } from '@/store';
import formatPrice from '@/utils/PriceFormat';
import {IoAddCircle, IoRemoveCircle} from 'react-icons/io5'
import Lottie from 'lottie-react';
import ShoppingEmpty from '@/public/floatingbasket.json';
import {motion } from 'framer-motion'

import React from 'react'
import Checkout from './Checkout';






const Cart = () => {
  
 const cartStore = useCartStore()

const totalPrice = cartStore.cart.reduce((acc, item) => {
  return acc + item.unit_amount * item.quantity
}, 0)


  return (
    <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} 
    onClick={cartStore.toggleCart} className='fixed w-full h-screen left-0 top-0 bg-black/25'>


      {/* Actual  Cart */}


      <motion.div layout onClick={(e)=> e.stopPropagation()} className='bg-white absolute right-0 top-0  h-screen p-12 overflow-y-scroll text-gray-700 w-full lg:w-2/5'>

    {cartStore.onCheckout === "cart"  &&(
        <p className='cursor-pointer' onClick={cartStore.toggleCart}>🏚️Home</p>
        )}
    {cartStore.onCheckout === "checkout"  &&(
        <p className='cursor-pointer' onClick={() => cartStore.setCheckout('cart')}>Back to cart 🛒</p>
        )}

      

        {cartStore.cart.length > 0 &&  cartStore.onCheckout === "cart" && <h1>Here's Your Shopping List 📃</h1>}


        {/* Cart Items */}
        {cartStore.onCheckout === 'cart' && (
           <>

        {cartStore.cart.map((item) => (
          <motion.div layout key={item.id} className='flex py-4 gap-4'>
            <Image className="h-8 w-8" src={item.image} alt={item.name} width={120} height={120}/>
            <div>
              <h2>{item.name}</h2>

              {/* Update Quantity  of product */}
              <div className='flex gap-2'>
              <h2>Quantity: {item.quantity}</h2>
              <button onClick={() => cartStore.addProduct({
                id : item.id,
                image: item.image,
                 name: item.name,
                 unit_amount: item.unit_amount,
                 quantity:item.quantity})} >
                <IoAddCircle/>
              </button>

              <button onClick={() => cartStore.removeProduct({
                id : item.id,
                image: item.image,
                 name: item.name,
                 unit_amount: item.unit_amount,
                 quantity:item.quantity})} > 
                <IoRemoveCircle/>
                </button>
              </div>
              <p className='text-sm'>{formatPrice(item.unit_amount)}</p>
             

            </div>
          </motion.div>

        ))}
          </>


        )}
  

   {/* Check out and total */}

   {cartStore.cart.length > 0 && cartStore.onCheckout === 'cart' && <p>Total : {formatPrice(totalPrice)}</p>}

        {cartStore.cart.length > 0 && cartStore.onCheckout === 'cart' &&
         
        <motion.button onClick={() => cartStore.setCheckout("checkout")} layout className='py-2 mt-4 bg-teal-700 w-full rounded-medium text-white'>
          Checkout</motion.button>
        }


        {cartStore.onCheckout === "checkout"  && <Checkout/>}
        {cartStore.cart.length < 1 && (
          <div className='flex flex-col items-center gap-12 text-2xl font-medium pt-56 opacity-75'>
            <h1>Sorry Your Cart is Empty</h1>

            <Lottie className='' animationData={ShoppingEmpty}/>
           
          </div>
        )}
      </motion.div>
       
    </motion.div>
  )
}

export default Cart
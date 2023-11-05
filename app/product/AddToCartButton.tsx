'use client'
 import { useCartStore } from "@/store";

 import React from 'react'
 
 export interface AddCartIn {
    name: string,
    id: number,
    image: string,
    quantity: number | 1,
    unit_amount: number
 }
 
 const AddToCart = ({name, id, image, unit_amount, quantity}: AddCartIn) => {
    const cartStore = useCartStore()
   return (
     <>
     <button onClick={() => cartStore.addProduct({name, id,  image, unit_amount, quantity})}  className="mt-3 p-2 bg-amber-500 text-white rounded'">Add To Cart</button>
     </>
   )
 }
 
 export default AddToCart
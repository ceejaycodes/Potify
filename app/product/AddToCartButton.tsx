'use client'
 import { useCartStore } from "@/store";

 import React, { useState } from 'react'
 
 export interface AddCartType {
    name: string,
    id: number,
    image: string,
    quantity: number | 1,
    unit_amount: number
 }
 
 const AddToCart = ({name, id, image, unit_amount, quantity}: AddCartType) => {
    const cartStore = useCartStore()
    const handleAddToCart = () => {
      cartStore.addProduct({ id, name, unit_amount, quantity, image})

    }
   return (
     <>
     <button onClick={handleAddToCart} 

      className="my-4 btn btn-primary w-full"
      >
      { <span>Add To Cart</span>}

        </button>
     </>
   )
 }
 
 export default AddToCart
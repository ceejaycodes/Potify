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
    const [added, setadded] = useState(false)

    const handleAddToCart = () => {
      cartStore.addProduct({ id, name, unit_amount, quantity, image})
      setadded(true)
      setTimeout(() => {
        setadded(false)
      }, 500)
    }
   return (
     <>
     <button onClick={handleAddToCart} 
     disabled={added}
      className="my-4 btn btn-primary w-full"
      >
      {!added && <span>Add To Cart</span>}
       {added && <span> Adding To Cart 🪴</span>}
        </button>
     </>
   )
 }
 
 export default AddToCart
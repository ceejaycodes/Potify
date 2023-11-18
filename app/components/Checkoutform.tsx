'use client'

import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState, useEffect } from "react";
import formatPrice from "@/utils/PriceFormat";
import { useCartStore } from "@/store";

export default function CheckoutForm(clientSecret: String){
    const cartStore = useCartStore()

    const totalPrice = cartStore.cart.reduce((acc, item) => {
        return acc + item.unit_amount * item.quantity
      }, 0)
      
    const stripe = useStripe()
    const elements = useElements()
    const [isLoading, setisLoading] = useState(false)

    const formatedPrice = formatPrice(totalPrice)

    useEffect(() => {
     if(!stripe){
        return
     }
     if(!clientSecret){
        return
     }
    
      
    }, [stripe])
    

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if(!stripe || !elements){
            return
        }

        setisLoading(true)

        stripe.confirmPayment({
            elements,
            redirect: 'if_required'

        }).then((result) => {
            if(!result.error){
                cartStore.setCheckout('success')
            }
            setisLoading(false)
        })

    }

     
    return(
        <form className="text-gray-600" onSubmit={handleSubmit} id="payment-form">
            <PaymentElement id="payment-element" options={{layout: 'tabs'}}/>
            <h1 className="py-4 text-sm font-bold">Total:{formatedPrice} </h1>
            <button className={"btn btn-primary"} id="submit" disabled={isLoading || !stripe || !elements }>
                <span id="button-text">
                    {isLoading ? <span>Processing🕺🏼</span> : <span>Pay Now 🤑</span>}

                </span>
            </button>

        </form>
    )
}
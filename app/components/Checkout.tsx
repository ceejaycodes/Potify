'use client'

import {loadStripe, StripeElementsOptions} from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js';
import { useCartStore } from '@/store';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import React from 'react'
import CheckoutForm from './Checkoutform';

type Props = {}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_PUBLISHABLE_KEY!)

const Checkout = (props: Props) => {
    const cartStore = useCartStore();
    const router = useRouter();
    const [clientSecret, setclientSecret] = useState("")

    useEffect(() => {
      //Create a payment intent as soon as the page loads up
      fetch('/api/create-payment-intent', {
        method: "POST",
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({
            items: cartStore.cart,
            payment_intent_id: cartStore.paymentIntent,
        })
      }).then((res) => {
        if(res.status === 403){
          return router.push('/api/auth/signin')

        }
        return res.json()
      }).then((data) => {
        setclientSecret(data.paymentIntent.client_secret)
        cartStore.setPaymentIntent(data.paymentIntent.id)
      })
    }, [])

    const options : StripeElementsOptions = {
      clientSecret,
      appearance: {
        theme: 'stripe',
        labels: 'floating'
      }

    }
    
  return (
    <div>
     {clientSecret && (
      <div>
        <Elements options={options} stripe={stripePromise}>
         <CheckoutForm clientSecret={clientSecret}/>

        </Elements>
        </div>
     )}
      </div>
  )
}

export default Checkout;
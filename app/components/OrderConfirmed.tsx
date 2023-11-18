'use client'
import { motion } from "framer-motion";
import Image from "next/image";
import Hampster from '@/public/AnikiHamster.json'
import Lottie from "lottie-react";
import Link from "next/link";
import { useCartStore } from "@/store";
import { useEffect } from "react";

export default function OrderConfirmed(){
    const cartStore = useCartStore();

    useEffect(() => {
        cartStore.setPaymentIntent('')
        cartStore.clearCart()

    }, [])

    const handleCheckout = ()=> {
        setTimeout(() => {
                cartStore.setCheckout('cart')
            }, 1000)
            cartStore.toggleCart()
        }
    

    return(
        <motion.div 
        className="flex items-center justify-center my-12"
        initial={{scale: 0.5, opacity: 0}}
        animate={{scale: 1, opacity: 1}}>

            <div className="p-12 rounded-md text-center">
                <h1 className="text 2xl font-mmedium">Your Order Has Been Placed 🧳</h1>
                <h2 className="text-sm my-4">Check Your Email For The Receipt</h2>
                <Lottie className={'py-8'} animationData={Hampster} alt="hampster"/>

                <div className="flex items-center justify-center gap-12">
                <Link href={'/dashboard'}>

                    <button onClick={handleCheckout} className="font-medium">
                            Check Your Order
                    </button>
                </Link>
            </div>
            </div>

           
            
        </motion.div>
    )

}

'use client'
import {Session} from 'next-auth'
import { signIn} from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import Cart from './cart'
import { useCartStore } from '@/store'
import { AiFillShopping } from 'react-icons/ai'
import { motion, AnimatePresence } from 'framer-motion';



export default function Nav({ user }: Session){
    const cartStore = useCartStore()
    return (
        <nav className='flex justify-around mt-7 ml-14 gap-12'>
           <Link href={'/'}> <h1>Potify</h1> </Link>
            <ul className='flex justify-evenly'>
                <li>
                    Products 
                </li>
                
                {/* toggle the cart */}
                <li onClick={cartStore.toggleCart} className='flex items-center text-3xl relative cursor-pointer'>
                    <AiFillShopping/>

                    <AnimatePresence>
                    {cartStore.cart.length > 0 && (
                    <motion.span animate={{ scale: 1}} initial={{scale: 0}} exit={{scale: 0}} className='bg-teal-700 text-white text-sm font-bold w-5 h-5 rounded-full absolute left-4 bottom-4 flex items-center justify-center'>
                        {cartStore.cart.length}
                    </motion.span>
                    )}
                    </AnimatePresence>
                </li>
                {!user && (
                    <li className='ml-5'>
                        <button onClick ={() =>{signIn()}} >Sign In</button>
                    </li>
                )}
                {user && (
                    <>
                    <li className='mr-7'>
                        <Image className='rounded-full ml-5 -mt-2 object-cover' src={user?.image as string} 
                        alt={user?.name as string} width={45} height={45}/>
                    </li>
                    <li className='ml-2'>{user?.name}</li>
                    </>
                )}
            </ul>
            <AnimatePresence>
            {cartStore.isOpen && <Cart/> }
            </AnimatePresence>
        </nav>
    )
}

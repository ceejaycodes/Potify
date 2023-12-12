'use client'
import {Session} from 'next-auth'
import { signIn} from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import Cart from './cart'
import { useCartStore, useNavToggle } from '@/store'
import { AiFillShopping } from 'react-icons/ai'
import { motion, AnimatePresence } from 'framer-motion';
import DarkLight from './DarkLight';
import Logo from '@/public/potify.webp';
import Open from '@/public/open.webp';
import Close from '@/public/close.webp'



export default function Nav({ user }: Session){
    const cartStore = useCartStore();

    const navToggle = useNavToggle();
    return (
        <div>
            <div className='flex justify-between'>
               <Link href='/'> <Image className='h-11 w-11 rounded-full' src={Logo} alt={'logo'} height={400} width={400}/> </Link>  
                <span className='block lg:hidden' onClick={navToggle.toggleMenu}>
                <Image src={navToggle.isOpen ? Close : Open} alt={'hamburger'}/>
                </span>
            
            </div>
        <nav className='lg:flex items-center mt-4 justify-evenly lg:-mt-18 ml-1 gap-4'>
            <ul className='flex gap-4'>
                <li className='hidden lg:flex'>
                 <Link href='/products'>   Products </Link>
                </li>
                
                {/* toggle the cart */}
                <li onClick={cartStore.toggleCart} className='flex items-center text-2xl relative cursor-pointer -mt-6'>
                    
                    <AiFillShopping className="h-5 w-5"/>

                    <AnimatePresence>
                    {cartStore.cart.length > 0 && (
                    <motion.span animate={{ scale: 1}} initial={{scale: 0}} exit={{scale: 0}} className='bg-primary text-white text-sm font-bold w-4 h-4 rounded-full absolute left-4 -mt-3 flex items-center justify-center'>
                        {cartStore.cart.length}
                    </motion.span>
                    )}
                    </AnimatePresence>
                </li>

                {/* Dak Mode */}
                <DarkLight/>

                {/* if the user is not logged in */}

                {!user && (
                    <li className='hidden lg:flex ml-5'>
                        <button onClick ={() =>{signIn()}} >Sign In</button>
                    </li>
                )}
                {user && (
                    <>
                    <li className='mr-7 hidden lg:flex'>
                        <Image className='rounded-full ml-5 -mt-2 object-cover' src={user?.image as string} 
                        alt={user?.name as string} width={45} height={45}/>
                    </li>
                    <li className='hidden lg:flex'>{user?.name}</li>
                    </>
                )}
            </ul>
            <AnimatePresence>
            {cartStore.isOpen && <Cart/> }
            </AnimatePresence>
        </nav>
        </div>
    )
}

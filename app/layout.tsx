import './globals.css'
import type { Metadata } from 'next'
import { Roboto, Inter } from 'next/font/google'
import Nav from './components/Nav';
import { getServerSession } from 'next-auth/next';
import Hydrate from './components/Hydrate';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { motion } from 'framer-motion'

const inter = Inter({ subsets: ['latin'] })

const roboto  = Roboto({weight: ['400', '500', '700'], subsets:['latin']})

export const metadata: Metadata = {
  title: 'Potify',
  description: '"Elevate Your Experience: Your Trusted Destination for Premium Cannabis Delivered to Your Doorstep!"',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const session = await getServerSession(authOptions)
  // console.log(session)
  return (
    <html lang="en">
      <body 
       className= {`flex flex-col justify-between ${roboto.className}`}>
        <Hydrate>
        <Nav user={session?.user} expires={session?.expires as string}/>
        {children}



        <footer className='flex  justify-center bg-slate-600'>
        <div className=' '> 
        <p className='text-slate-300 text-sm'>© Copyright 2023. Made By Marvel</p>
       </div>

        </footer>
        </Hydrate>


        
        </body>
    </html>
  )
}

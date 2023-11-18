'use client'
import { useThemeStore } from '@/store';
import { SessionProvider } from 'next-auth/react';
import {ReactNode, useEffect, useState} from 'react';


export default function Hydrate({children}: {children: ReactNode}){
    const [isHydrated, setisHydrated] = useState(false)
    const themeStore = useThemeStore()

    useEffect(() => {
      setisHydrated(true)

    }, [])
    
    return(
      <SessionProvider>  
    {isHydrated ? <body data-theme={themeStore.mode}>{children}</body> : <body data-theme={themeStore.mode}><h1>Loading....</h1></body>}
    </SessionProvider>
    )
}
'use client'
import {ReactNode, useEffect, useState} from 'react';


export default function Hydrate({children}: {children: ReactNode}){
    const [isHydrated, setisHydrated] = useState(false)

    useEffect(() => {
      setisHydrated(true)

    }, [])
    
    return(
        <>
    {isHydrated ? <>{children}</> : <div><h1>Loading....</h1></div>}
    </>
    )
}
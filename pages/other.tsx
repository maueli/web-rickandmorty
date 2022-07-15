import React from 'react';
import type { NextPage } from 'next'
import { useRouter } from 'next/router';

export default function Other ({params}){
    const router = useRouter();
    // console.log(router.asPath)
    return(
        <div>
            hola
            <button type='button' onClick={()=>router.push('/')}>
                Go Back
            </button>
        </div>
    )
}
'use client'
import React, { useEffect } from 'react'
import Sign from '@/components/Sign'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useRouter } from 'next/navigation';

const Page = () => {
  const router=useRouter();
  useEffect(()=>{
    if(localStorage.getItem('token')==='true')
      router.push('/search')
  })
  
  return (
    <GoogleOAuthProvider clientId="352182692622-brvbg8nma4uenci0p46rlhlrvoegatob.apps.googleusercontent.com">

    <Sign></Sign>
    </GoogleOAuthProvider>
  )
}

export default Page
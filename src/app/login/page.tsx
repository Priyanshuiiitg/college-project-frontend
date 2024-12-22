'use client'
import React, { useEffect } from 'react'
import Sign from '@/components/Sign'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useRouter } from 'next/navigation';

const page = () => {
  const router=useRouter();
  useEffect(()=>{
    if(localStorage.getItem('token')==='true')
      router.push('/search')
  })
  
  return (
    <GoogleOAuthProvider clientId="514006376594-5di3ffrvp6dqoefcqbrr7umlgtninhga.apps.googleusercontent.com">

    <Sign></Sign>
    </GoogleOAuthProvider>
  )
}

export default page
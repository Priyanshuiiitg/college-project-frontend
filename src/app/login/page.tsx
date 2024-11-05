import React from 'react'
import Sign from '@/components/Sign'
import { GoogleOAuthProvider } from '@react-oauth/google';

const page = () => {
  return (
    <GoogleOAuthProvider clientId="514006376594-5di3ffrvp6dqoefcqbrr7umlgtninhga.apps.googleusercontent.com">

    <Sign></Sign>
    </GoogleOAuthProvider>
  )
}

export default page
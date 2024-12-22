'use client';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';

const GoogleLogin = dynamic(
  () => import('@react-oauth/google').then((mod) => mod.GoogleLogin),
  { ssr: false } // Disable server-side rendering for this component
);

export default function Sign() {
    const router=useRouter()
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true); // Set to true after the component mounts
  }, []);

  return (
    <div className="flex min-h-full flex-1">
      {/* Left section: Text and Google Sign-in */}
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div>
            {/* Company Logo */}
            {/* <img
              alt="Your Company"
              src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
              className="h-10 w-auto"
            /> */}
            {/* Page Title */}
            <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>

          {/* Google Login Section */}
          <div className="mt-10">
            <div className="relative mb-10">
              {/* Horizontal line divider */}
              <div aria-hidden="true" className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
            </div>

            {/* Conditionally render GoogleLogin based on mount status */}
            <div className="mt-6">
              {isMounted && ( // Render GoogleLogin only after the component has mounted
                <GoogleLogin
                  onSuccess={(credentialResponse) => {
                    localStorage.setItem('token',"true")
                    console.log(jwtDecode(credentialResponse?.credential || ""));
router.push('/search')                    
                  }}
                  onError={() => {
                    console.log('Login Failed');
                  }}
                  size="large"
                  text="signin_with"
                  shape="pill"
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Right section: Background Image */}
      <div className="relative hidden w-0 flex-1 lg:block h-screen">
        <img
          alt=""
          src="https://images.unsplash.com/photo-1496917756835-20cb06e75b4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    </div>
  );
}

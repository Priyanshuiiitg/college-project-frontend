'use client';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';

const GoogleLogin = dynamic(
  () => import('@react-oauth/google').then((mod) => mod.GoogleLogin),
  { ssr: false }
);

export default function Sign() {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="flex min-h-screen flex-col lg:flex-row ">
      {/* Left Section - Text & Login */}
      <div className="flex flex-1 flex-col justify-center items-center px-6 py-12 sm:px-10 lg:px-20">
        <div className="w-full max-w-md text-center bg-white p-6 rounded-xl shadow-lg">
          <h1 className="text-4xl font-bold text-gray-900 animate-fade-in">
            Welcome Back!
          </h1>
          <p className="mt-3 text-gray-600">Sign in to continue exploring.</p>
          
          <div className="mt-8 flex justify-center">
            {isMounted && (
              <GoogleLogin
                onSuccess={() => {
                  localStorage.setItem('token', 'true');
                  router.push('/search');
                }}
                onError={() => {
                  console.log('Login Failed');
                }}
                text="signin_with"
                shape="pill"
                className="w-full transform transition-all hover:scale-105 duration-300"
              />
            )}
          </div>
        </div>
      </div>

      {/* Right Section - Engaging Image */}
      <div className="hidden lg:flex w-1/2 relative">
        <img
          src="https://images.unsplash.com/photo-1496917756835-20cb06e75b4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1908&q=80"
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover rounded-l-2xl shadow-lg"
        />
      </div>
    </div>
  );
}

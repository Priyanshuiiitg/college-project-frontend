'use client'
import Image from "next/image";
import Login from "@/components/Login";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
export default function Home() {
  // const router=useRouter();
  // useEffect(()=>{
  //   if(localStorage.getItem('token')==='true'){
  //     router.push('/search')
  //   }
  // },[])
  return (
    <Login></Login>
  );
}

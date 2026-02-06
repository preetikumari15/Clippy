"use client"
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { UserButton, useUser } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';

function Header() {
  const { isSignedIn } = useUser();

  return (
     <nav className='p-5 px-10 flex items-center justify-between border-b border-gray-100 sticky top-0 bg-white/80 backdrop-blur-md z-50'>
         <div className='flex gap-2 items-center'>
            <Image src={'/logo.png'} alt='logo' width={35} height={35} />
            <h1 className='font-bold text-2xl text-purple-600'>Clippy</h1>
         </div>
         
         <div className='flex gap-6 items-center'>
             {isSignedIn ? (
                <Link href={'/'}>
                    <Button className="bg-purple-600 hover:bg-purple-700 text-white">Home</Button>
                </Link>
             ) : (
                <Link href={'/sign-in'}>
                    <Button variant="outline" className="text-purple-600 border-purple-600 hover:bg-purple-50">Sign In</Button>
                </Link>
             )}
              {/* User Profile */}
            <div className='flex items-center'>
                <UserButton afterSignOutUrl="/" />
            </div>
         </div>
      </nav>
  )
}

export default Header
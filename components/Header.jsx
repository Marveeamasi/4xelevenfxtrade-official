'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'

export default function Header() {
  const [hasScrolled, setHasScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setHasScrolled(scrollY > 10); 
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll); 
  }, []);

  return (
    <nav className={`z-20 flex justify-between bg-blend-darken bg-[#000000e1] sm:items-center p-4 sm:px-20 sm:py-0 w-full max-sm:gap-6 sticky top-0 sm:flex-wrap sm:flex-row flex-col-reverse ${hasScrolled && 'bg-[#0a0a0ae0] backdrop-blur-lg'}`}>
      <Navbar/>
      <div className='flex gap-3 items-center sm:justify-end justify-between max-sm:w-full max-sm:justify-between flex-[1]'>
      <Link href={'/'} className='flex gap-3 items-center sm:hidden'>
        <img src="logo.png" alt="logo" className='w-6 h-auto rounded-full logo-glow' />
        <span className='font-[900]'>4Elevenfxtrade</span>
      </Link>
      <div className='flex gap-3'>
        <Link href={'login'} className='hover:opacity-75 rounded-lg border border-[#00eaff] text-col w-[70px] h-[30px] flex justify-center items-center text-sm font-bold'>Login</Link>
        <Link href={'register'} className='hover:opacity-75 rounded-lg bg-col text-[black] w-[70px] h-[30px] flex justify-center items-center text-sm font-bold'>Sign Up</Link>
      </div>
      </div>
    </nav>
  )
}

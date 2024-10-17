import React from 'react'
import MenuItems from './MenuItems'
import { AiFillHome } from "react-icons/ai";
import { SiAboutdotme } from "react-icons/si";
import { FaBitcoin } from "react-icons/fa";
import { MdContactPhone } from "react-icons/md";
import Link from 'next/link';

export default function Navbar() {
  return (
    <div className='sm:flex sm:justify-between sm:p-4 sm:pl-0 sm:items-center sm:flex-[2] max-sm:w-full'>
      <Link href={'/'} className='sm:flex hidden gap-3 items-center'>
        <img src="logo.png" alt="logo" className='w-6 lg:w-8 h-auto rounded-full logo-glow' />
        <span className='text-2xlg font-[900]'>4Elevenfxtrade</span>
      </Link>
    <div className='flex justify-end items-center gap-4 max-sm:justify-between max-sm:w-full'>
       <MenuItems title='Home' Icon={AiFillHome} name={`#home`}/>
       <MenuItems title='About Us' Icon={SiAboutdotme} name={`#about`}/>
       <MenuItems title='Trade Plans' Icon={FaBitcoin} name={`#plans`}/>
       <MenuItems title='Contact Us' Icon={MdContactPhone} name={`#contact`}/>
    </div>
    </div>
  )
}

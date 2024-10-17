import React from 'react'
import { FaWallet } from "react-icons/fa6";
import { BsBriefcaseFill } from "react-icons/bs";
import { GiCash } from "react-icons/gi";

export default function HowItWorks() {
  return (
    <div className='w-full flex flex-col justify-center items-center p-4 sm:px-20 gap-20 sm:gap-10 mt-20 dark-bg'>
      <div className=' flex flex-col gap-4 w-full items-center'>
        <h1 className='text-col text-3xl'>How It Works</h1>
        <hr className='w-10 bg-col h-1'/>
      </div>
      <div className='flex flex-wrap items-end justify-center gap-10'>
        <div className='flex flex-col shadow-glow-mild rounded-lg w-[60%] h-[300px] sm:w-[350px] sm:h-[300px] justify-center items-center gap-2 relative p-4'>
           <div className='absolute font-extrabold text-6xl top-2 right-2 text-col opacity-75'>1</div>
           <FaWallet className='text-6xl text-[#00eaff]'/>
           <div className='text-2xl font-bold text-center w-full'>Sign Up for Free</div>
           <p className='text-center w-full text-[#a2a1ab]'>Open an Account with just your email address, No verification documents required.</p>
        </div>
        <div className='flex flex-col shadow-glow-mild rounded-lg w-[80%] h-[300px] sm:w-[350px] sm:h-[350px] justify-center items-center gap-2 relative p-4'>
           <div className='absolute font-extrabold text-6xl top-2 right-2 text-col opacity-75'>2</div>
           <BsBriefcaseFill className='text-6xl text-[#00eaff]'/>
           <div className='text-2xl font-bold text-center w-full'>Select a Package and Make Deposit</div>
           <p className='text-center w-full text-[#a2a1ab]'>Choose from any of our plan that suite you. Fund your account with Bitcoins & more, No transfer fees charged..</p>
        </div>
        <div className='flex flex-col shadow-glow-mild rounded-lg w-full h-[300px] sm:w-[350px] sm:h-[400px] justify-center items-center gap-2 relative p-4'>
           <div className='absolute font-extrabold text-6xl top-2 right-2 text-col opacity-75'>3</div>
           <GiCash className='text-6xl text-[#00eaff]'/>
           <div className='text-2xl font-bold text-center w-full'>Start Earning</div>
           <p className='text-center w-full text-[#a2a1ab]'>Make profits from world’s most liquid markets with your preferred base currency & account type.</p>
        </div>
      </div>
    </div>
  )
}

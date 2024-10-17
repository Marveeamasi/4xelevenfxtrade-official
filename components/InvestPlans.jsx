import Link from 'next/link';
import React from 'react'
import { TiTickOutline } from "react-icons/ti";
import { TiTick } from "react-icons/ti";

export default function InvestPlans() {

  return (
    <div className='w-full flex flex-col justify-center max-sm:items-center p-4 sm:px-20 gap-20 sm:gap-10 mt-20'>
        <h1 className='text-3xl'>Select a plan to invest</h1>
    <div className='grid sm:grid-cols-2 grid-cols-1 gap-10 xl:grid-cols-3 2xl:grid-cols-4'>
      <div className='flex flex-col shadow-glow-mild rounded-lg w-full h-[500px] justify-center items-center gap-5 p-4'>
         <div className='text-2xl font-bold text-center w-full'>Student Plan</div>
         <div className='text-3xl font-bold text-center w-full text-col '>10% Weekly ROI</div>
         <div className='flex gap-2 items-center  w-full'>
          <TiTickOutline className='text-[#00eaff]'/>
          <div className=''>Minimum Deposit - $100</div>
         </div>
         <div className='flex gap-2 items-center w-full'>
          <TiTick className='text-[#00eaff]'/>
          <div className=''>Maximum Deposit - $2000</div>
         </div>
         <p className='text-center w-full text-[#a2a1ab]'>Duration of 2 weeks</p>
         <Link href='payment/student' className=' flex justify-center items-center w-40 h-10 rounded-lg bg-col hover:opacity-75 text-black text-sm font-bold'>Invest</Link>
 
      </div>
      <div className='flex flex-col bg-col rounded-lg w-full h-[500px] justify-center items-center gap-5 p-4 opacity-[.9]'>
         <div className='text-2xl font-bold text-center w-full text-[#000]'>Retirement Plan</div>
         <div className='text-3xl font-bold text-center w-full text-[#ffffffef]'>20% Weekly ROI</div>
         <div className='flex gap-2 items-center w-full'>
          <TiTickOutline className='text-[#000000]'/>
          <div className='text-black font-bold'>Minimum Deposit - $300,000</div>
         </div>
         <div className='flex gap-2 items-center w-full'>
          <TiTick className='text-[#000000]'/>
          <div className='text-black font-bold'>Maximum Deposit - $10,000,000</div>
         </div>
         <p className='text-center w-full text-[#181818] font-bold'>Duration of 1 year</p>
         <Link href='payment/retirement' className=' flex justify-center items-center w-40 h-10 rounded-lg border border-black hover:opacity-75 text-black text-sm font-bold'>Invest</Link>
 
      </div>
      <div className='flex flex-col shadow-glow-mild rounded-lg w-full h-[500px] justify-center items-center gap-5 p-4'>
         <div className='text-2xl font-bold text-center w-full'>Platinium Plan</div>
         <div className='text-3xl font-bold text-center w-full text-col '>15% Weekly ROI</div>
         <div className='flex gap-2 items-center  w-full'>
          <TiTickOutline className='text-[#00eaff]'/>
          <div className=''>Minimum Deposit - $50,000</div>
         </div>
         <div className='flex gap-2 items-center  w-full'>
          <TiTick className='text-[#00eaff]'/>
          <div className=''>Maximum Deposit - $300,000</div>
         </div>
         <p className='text-center w-full text-[#a2a1ab]'>Duration of 3 months</p>
         <Link href='payment/platinium' className=' flex justify-center items-center w-40 h-10 rounded-lg bg-col hover:opacity-75 text-black text-sm font-bold'>Invest</Link>
 
      </div>
      <div className='flex flex-col shadow-glow-mild rounded-lg w-full h-[500px] justify-center items-center gap-5 p-4'>
         <div className='text-2xl font-bold text-center w-full'>Worker Plan</div>
         <div className='text-3xl font-bold text-center w-full text-col '>12% Weekly ROI</div>
         <div className='flex gap-2 items-center  w-full'>
          <TiTickOutline className='text-[#00eaff]'/>
          <div className=''>Minimum Deposit - $2,000</div>
         </div>
         <div className='flex gap-2 items-center  w-full'>
          <TiTick className='text-[#00eaff]'/>
          <div className=''>Maximum Deposit - $50,000</div>
         </div>
         <p className='text-center w-full text-[#a2a1ab]'>Duration of 1 month</p>
         <Link href='payment/worker' className=' flex justify-center items-center w-40 h-10 rounded-lg bg-col hover:opacity-75 text-black text-sm font-bold'>Invest</Link>
 
      </div>
    </div>
  </div>
  )
}

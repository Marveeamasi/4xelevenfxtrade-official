'use client'
import { FaCalendarAlt } from "react-icons/fa";
import { FaUsers } from "react-icons/fa6";
import { PiHandWithdrawFill } from "react-icons/pi";
import CountUp from 'react-countup';

export default function Count() {
  
  return (
    <div className='flex flex-col max-sm:justify-center max-sm:items-center w-full bg-[#121516ef] p-4 sm:p-20 mt-10 gap-5'>
      <div className=''>The 4Elevenfxtrade</div>
      <h1 className='text-col text-3xl'>Awesome Facts</h1>
      <hr className='w-10 bg-col h-1'/>
      <div className='flex flex-wrap items-center max-sm:flex-col max-sm:justify-center gap-10 max-sm:gap-20 max-sm:mt-10'>
       <div className='flex flex-col gap-5 justify-center items-center sm:items-start'>
        <div className='flex gap-4 items-center justify-between'>
            <div className='text-col text-2xl font-extrabold'>
            <CountUp start={0} end={887} duration={2} separator="," />
            </div>
            <FaCalendarAlt className='text-3xl'/>
        </div>
        <div className=''>Day Since The Start</div>
       </div>
       <div className='flex flex-col gap-5 justify-center items-center sm:items-start'>
        <div className='flex gap-4 items-center justify-between'>
            <div className='text-col text-2xl font-extrabold' >
            <CountUp start={0} end={78886} duration={2} separator="," />
            </div>
            <FaUsers className='text-3xl'/>
        </div>
        <div className=''>Number Of Participants</div>
       </div>
       <div className='flex flex-col gap-5 justify-center items-center sm:items-start'>
        <div className='flex gap-4 items-center justify-between'>
            <div className='text-col text-2xl font-extrabold'> 
            <CountUp start={0} end={1209} duration={2} separator="," />
              </div>
            <PiHandWithdrawFill className='text-3xl'/>
        </div>
        <div className=''>Total Withdrawn</div>
       </div>
      </div>
    </div>
  )
}

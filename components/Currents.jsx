'use client'
import { BsArrow90DegUp} from 'react-icons/bs'
import CountUp from 'react-countup';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Currents({plan, initial, date, id, user, profit, currentAmount, nextPay, durationElapsed}) {
  const [rate, setRate] = useState(null);
  const [overdue, setOverdue] = useState(null);
  const [underdue, setUnderdue] = useState(null);
  const planColors = {
    worker: 'diamond-sh',
    student: 'silver-sh',
    platinium: 'gold-sh',
    retirement: 'gen-sh',
  };
  const planText = {
    worker: 'diamond-txt',
    student: 'silvertxt',
    platinium: 'gold-txt',
    retirement: 'gen-txt',
  };


  const planRates = {
    worker: 12,
    student: 10,
    platinium: 15,
    retirement: 20,
  };

  const planDurations = {
    worker: 30,
    student: 14,
    platinium: 90,
    retirement: 365,
  };

  const bgCol = planColors[plan] || ''; 
  const txtCol = planText[plan]  || '';

  useEffect(()=>{
    setRate(planRates[plan] || 0);
  },[plan])

  return (
    <Link href={'/withdraw/'+currentAmount+'__'+overdue+'__'+underdue+'__'+id+'__'+user+'__'+plan+'__'+initial} className={`rounded-lg ${bgCol} p-5 flex flex-col gap-5 text-[#eee]`}>
      <h1 className='text-sm text=[#a2a1ab]'>{plan}</h1>
      <div className='text-[#eee] text-center'>{durationElapsed
          ? <div class="text-[#ffff00] animate-pulse">Completed</div>
          : `+${rate}% in the next ${nextPay || 7} day(s)`}</div>
      <div className='flex flex-col justify-center items-center w-full gap-5'>
        <div className='flex items-center gap-2 flex-wrap w-full'>
          <CountUp start={0} end={currentAmount} duration={2} separator="," className='font-bold text-lg'/>
          <span className={`text-[11px] ${txtCol}`}>Current</span>
          </div>
        <div className='flex items-center gap-5 w-full'>
           <BsArrow90DegUp className='animate-bounce'/>
           <div className='flex items-center gap-2 flex-wrap'>
        <div className='font-[200]'>{parseFloat(initial).toLocaleString()}</div><span className={`text-[11px] ${txtCol}`}>Initial</span></div>
        </div>
      </div>
    </Link>
  )
}

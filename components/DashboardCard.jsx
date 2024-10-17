import React from 'react'
import CountUp from './CountUp'
import Link from 'next/link'

export default function DashboardCard({title, sign, Icon, amount, link}) {
  return (
    <Link href={link} className='bg-[#0a0c0c] hover:bg-[#1b2424] hover:animate-pulse rounded-lg flex  flex-col gap-5 p-5 max-xsm:items-center'>
        <Icon className='text-6xl text-[rgba(0,234,255,0.75)] rounded-full bg-[rgba(0,234,255,0.05)] p-3'/>
        <CountUp endValue={Number(amount)} sign={sign}/>
         <div>{title}</div>
    </Link>
  )
}

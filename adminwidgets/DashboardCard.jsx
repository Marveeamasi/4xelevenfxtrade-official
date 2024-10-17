'use client'
import CountUp from '@/components/CountUp'


export default function DashboardCard({title, sign, Icon, amount}) {
  return (
    <div className='bg-[#0a0c0c] rounded-lg flex  flex-col gap-5 p-5 max-xsm:items-center '>
        <Icon className='text-6xl text-[rgba(0,234,255,0.75)] animate-pulse rounded-full bg-[rgba(0,234,255,0.05)] p-3'/>
        <CountUp endValue={Number(amount)} sign={sign} isAdmin={true}/>
         <div className='text-center'>{title}</div>
    </div>
  )
}
import React from 'react'

export default function Testimony({ data }) {
  return (
    <div className='w-full flex flex-col justify-center items-center p-4 sm:px-20 bg-[#00eaff05] gap-20 sm:gap-10 mt-20'>
      <div className=' flex flex-col gap-4 w-full items-center'>
        <h1 className='text-3xl'>Recents transactions</h1>
        <hr className='w-10 bg-col h-1'/>
      </div>
      <div className='flex flex-col gap-1 w-full'>
      <div className={`grid grid-cols-3 p-3 text-sm font-[200] bg-[#00eaff20] rounded-lg max-xsm:text-[11px] w-full`}>
        <h1 className=''>Wallet Address</h1>
        <h1 className=''>Last Deposit</h1>
        <h1 className=''>Withdraw Amount</h1>
      </div>
      {data.map((d, i)=>(
         <div key={i} className={`grid grid-cols-3 p-3 text-sm font-[200] bg-[#00eaff10] rounded-lg max-xsm:text-[11px] w-full`}>
         <div>{`${d?.walletAddress?.substring(0,6)}..${d?.walletAddress?.substring(d?.walletAddress?.length - 4, d?.walletAddress?.length)}`}</div>
         <div>${d?.lastDeposit?.toLocaleString()}</div>
         <div>${d?.amountWithdrawn?.toLocaleString()}</div>
       </div>
      ))}
      </div>
      </div>
  )
}
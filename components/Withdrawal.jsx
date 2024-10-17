'use client'
import moment from 'moment';
import React, { useEffect, useState } from 'react'

export default function Withdrawal({plan, status,amount,date}) {
    const [textCol, setTextCol] = useState('')
    useEffect(()=>{
        if(status==='approved'){
            setTextCol("text-[#00ffff80]");
        }else if(status==='pending'){
             setTextCol("text-[#ffff0080]");
        }else if(status==='failed'){
            setTextCol("text-[#ff00ff80]");
        }
    },[status])
  return (
    <div className='grid grid-cols-4 p-3 text-sm font-[200] bg-[rgb(0,234,255,0.01)] rounded-lg max-xsm:text-[11px]'>
      <div>{plan.substring(0,7)}</div>
      <div>${amount.toLocaleString()}</div>
      <div className={`${textCol}`}>{status}</div>
      <div>{moment(date.toDate()).calendar()}</div>
    </div>
  )
}
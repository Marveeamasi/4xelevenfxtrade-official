'use client'
import React, { useEffect, useState } from 'react'
import { IoMdThumbsUp } from "react-icons/io";
import { IoHandLeft } from "react-icons/io5";
import { IoMdThumbsDown } from "react-icons/io";
import moment from 'moment';

export default function RequestItems({plan, status, amount, date}) {
    const [bgCol, setBgCol] = useState('');
    const [txtCol, setTxtCol] = useState('');
    useEffect(()=>{
        if(status==='approved'){
            setBgCol("bg-[#00ffff03]");
            setTxtCol("text-[#00ffff30]");
        }else if(status==='pending'){
             setBgCol("bg-[#ffff0003]");
             setTxtCol("text-[#ffff0030]");
        }else if(status==='failed'){
            setBgCol("bg-[#ff00ff03]");
            setTxtCol("text-[#ff00ff30]");
        }
    },[])
  return (
    <div className={`grid grid-cols-4 p-3 text-sm font-[200] ${bgCol} rounded-lg max-xsm:text-[11px]`}>
      <div>{plan.substring(0,7)}</div>
      <div>{amount.toLocaleString()}</div>
     {status==='approved' && <IoMdThumbsUp className={`${txtCol} text-xl`}/>}
     {status==='pending' && <IoHandLeft className={`${txtCol}  text-xl`}/>}
     {status==='failed' && <IoMdThumbsDown className={`${txtCol}  text-xl`}/>}
     <div>{moment(date.toDate()).calendar()}</div>
    </div>
  )
}
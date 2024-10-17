'use client'
import React, { useEffect, useState } from 'react'

export default function error({error, reset}) {
  const [message, setMessage] = useState('Invest, and see you money grow weekly');
  const text = [
    `Get instant withdraw from referal rewards.`,
     `Invest, and see you money grow weekly.`,
      `4Elevenfxtrade'S payment method is much safer and reliable.`, 
      `Users' privacy and information is encrypted.`,
       `4Elevenfxtrade fully built to assist and develop your assets to the best it can.`,
     `4Elevenfxtrade'S resourses covers everyone, students, workers, retired, etc.`,
    `Ready to help the best we can, providing quality services`]
    useEffect(()=>{
        console.log(error)
        const randomIndex = Math.floor(Math.random() * text.length);
        setMessage(text[randomIndex]);
    },[error])
  return (
    <div className='h-screen w-full flex flex-col items-center justify-center gap-10'>
      <h1 className='w-full text-center'>{message}</h1>
      <button className='w-40 h-10 rounded-lg bg-col hover:opacity-75 text-black text-sm font-bold' onClick={()=>reset()}>Go it</button>
    </div>
  )
}

import Link from 'next/link'
import React from 'react'

export default function HeroSlide({title, action, desc, img, animate, wi}) {
  return (
    <div className='w-full max-sm:pb-10 max-sm:pt-0 flex items-center justify-center bg-no-repeat h-screen bg-center bg-blend-darken bg-[#000000e1] max-sm:flex-col-reverse'>
      <div className='flex flex-col gap-5 flex-[1] max-sm:items-center sm:px-20 p-4'>
        <div className='text-col font-extrabold text-5xl max-sm:text-center '>{title}</div>
        <div className='max-sm:text-center'>{desc}</div>
        <Link href={`/register`} className=' flex justify-center items-center w-40 h-10 rounded-lg bg-col hover:opacity-75 text-black text-sm font-bold'>{action}</Link>
      </div>
      <div className='flex-[1] flex justify-center items-center'>
      <img src={img} alt="logo" className={`${animate} ${wi} h-auto`}/>
      </div>  
    </div>
  )
}

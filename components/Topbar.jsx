import { auth } from '@/firebase'
import React from 'react'

export default function Topbar({title}) {
  return (
    <div className='w-full flex justify-between items-center p-5 backdrop-blur-sm sticky top-0 sm:right-0'>
        <div className='flex flex-col gap-4'>
        <div className='flex gap-3 items-center'>
        <img src="/logo.png" alt="logo" className='sm:hidden w-6 h-auto rounded-full logo-glow' />
        <div className='capitalize font-extralight'>{title}</div>
        </div>
        <hr className='w-20 h-[1px] bg-[#00eaff] opacity-[.2] max-sm:hidden'/>
        </div>
        <div onClick={()=> auth.signOut()} className='cursor-pointer hover:opacity-75 rounded-lg border border-[#00eaff] text-col w-[70px] h-[30px] flex justify-center items-center text-sm font-bold'>Logout</div>
    </div>
  )
}

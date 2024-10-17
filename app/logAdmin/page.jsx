'use client'
import Link from 'next/link'
import React, { useState } from 'react'

export default function page() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = () => {
         window.location.href = '/admin?query='+username+'__'+password;
    };

  return (
    <div className='w-full flex items-center justify-center h-screen'>
       <div className='backdrop-blur-lg max-sm:w-full w-[500px] rounded-lg grid grid-cols-1 gap-5 bg-[#0e1111e5] p-10 shadow-lg'>
       <Link href={'/'} className='flex gap-3 items-center justify-center sm:justify-start'>
        <img src="/logo.png" alt="logo" className='w-6 h-auto rounded-full logo-glow' />
        <span className='font-[900] text-lg text-[#eee]'>4Elevenfxtrade</span>
      </Link>
      <div className='text-col max-sm:text-center w-full font-[600]'>Get full adminatrative priveleges..</div>
          <input onChange={(e)=> setUsername(e.target.value)} type="text" maxLength={20} className='mt-10 outline-none bg-transparent border border-[#00eaff15] h-[50px] hover:bg-[#00eaff15] hover:border-none rounded-lg p-2' placeholder='Username'/>
          <input onChange={(e)=> setPassword(e.target.value)} type="password" maxLength={20} className='outline-none bg-transparent border border-[#00eaff15] h-[50px] hover:bg-[#00eaff15] hover:border-none rounded-lg p-2' placeholder='Password'/>
          <button onClick={handleSubmit} className='bg-col text-[black] w-full h-[50px] rounded-lg font-bold hover:opacity-75'>Submit</button>
       </div>
    </div>
  )
}

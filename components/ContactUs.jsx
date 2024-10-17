'use client'
import Link from 'next/link'
import React, { useState } from 'react'

export default function ContactUs() {
  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  function sendEmail() {
    var mailtoLink = "mailto:" + "info@4xeleventrade.store" + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(message+` COMING FROM ${fullname}, ${email}, ${phone}`);
    window.location.href = mailtoLink;
}


  
  return (
    <div className='w-full flex max-sm:flex-col-reverse max-sm:justify-center sm:items-start items-center p-4 sm:p-20 gap-4 sm:gap-10 my-20 bg-[#121516ef]'>
    <div className='sm:flex-[1] flex flex-col gap-4 max-sm:w-full items-start max-sm:items-center'>
      <h1 className='text-col text-3xl'>Contact Us</h1>
      <hr className='w-10 bg-col h-1'/>
      <p className='max-sm:text-center max-sm:my-5'>Reach out to us, let's hear from you.</p>
      <div className='grid grid-cols-1 gap-4'>
      <div className='grid grid-cols-2 gap-4'>
        <input onChange={(e)=> setFullname(e.target.value)} type="text" max={16} className='p-2 placeholder:text-sm bg-transparent outline-none border border-[#00eaff15] hover:shadow-glow-mild' placeholder='Full Name' />
        <input onChange={(e)=> setEmail(e.target.value)} type="email" className='p-2 placeholder:text-sm bg-transparent outline-none border border-[#00eaff15] hover:shadow-glow-mild' placeholder='Email' />
      </div>
      <div className='grid grid-cols-2 gap-4'>
        <input onChange={(e)=> setPhone(e.target.value)} type="number" className='p-2 placeholder:text-sm bg-transparent outline-none border border-[#00eaff15] hover:shadow-glow-mild' placeholder='Phone Number' />
        <input onChange={(e)=> setSubject(e.target.value)} type="text" maxLength={16} className='p-2 placeholder:text-sm bg-transparent outline-none border border-[#00eaff15] hover:shadow-glow-mild' placeholder='Subject' />
      </div>
      <textarea onChange={(e)=> setMessage(e.target.value)} name="" id="" maxLength={100} className='p-2 placeholder:text-sm bg-transparent outline-none border border-[#00eaff15] hover:shadow-glow-mild' placeholder='Message'></textarea>
      </div>
      
         <button onClick={sendEmail} className=' flex justify-center items-center w-40 h-10 rounded-lg bg-col hover:opacity-75 text-black text-sm font-bold'>Submit</button>
    </div>
    <div className='sm:flex-[1] max-sm:w-full'>
      <img src="about3.jpg" alt="about image" className='rounded-lg w-[100%] h-auto object-cover'/>
    </div>
  </div>
  )
}
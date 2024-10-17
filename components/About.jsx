import Link from 'next/link'
import React from 'react'

export default function  About() {
  return (
    <div className='w-full flex max-sm:flex-col max-sm:justify-center sm:items-start items-center p-4 sm:p-20 gap-4 sm:gap-10 pt-10 bg-[#121516ef]'>
      <div className='sm:flex-[1] max-sm:w-full'>
        <div className='w-[100%] grid grid-cols-2 sm:grid-cols-1 h-auto gap-1 shadow-2xl'>
           <img src="aboutimg2.jpg" alt="about image" className=' w-[100%] h-[300px] max-sm:h-[150px] object-fill'/>
        <img src="about1.jpg" alt="about image" className=' w-[100%] h-[300px] max-sm:h-[150px] object-fill'/>
        <img src="aboutimg1.jpeg" alt="about image" className=' w-[100%] h-[300px] max-sm:h-[150px] object-fill '/>
        <img src="aboutimg3.jpg" alt="about image" className=' w-[100%] h-[300px] max-sm:h-[150px] object-fill'/>
        </div>
      </div>
      <div className='sm:flex-[1] flex flex-col gap-4 max-sm:w-full items-start max-sm:items-center'>
        <h1 className='text-col text-3xl'>About Us</h1>
        <hr className='w-10 bg-col h-1'/>
        <p className='max-sm:text-center'>At 4ElevenFXTrade, we are committed to empowering individuals to achieve their financial goals,
           whether it’s paying off student loans, buying a house, starting a business, or planning for a comfortable retirement.
            We understand that financial freedom is the key to unlocking opportunities, and our mission is to provide you with the tools
             and support to make that freedom a reality.
        </p>
      <p className='max-sm:text-center text-[#a2a1ab]'><span className='text-white'>Our mission is simple:</span> to help you build and secure your financial future.
         Whether you're a student burdened with loans, a working professional looking to invest in your first home,
          an entrepreneur ready to start your own business, or someone planning for retirement, we're here to guide you every step of the way.
           We believe in creating pathways to generational wealth, ensuring that the decisions you make today will benefit not only you
            but also future generations.
      </p>
      <p className="max-sm:text-center text-[#a2a1ab]">
      <span className='text-white'>
      Why Choose Us?
      </span>
      <br />
     - Tailored Financial Solutions: We offer customized financial strategies designed to meet your unique needs and goals.
      Whether it's loan repayment plans, investment opportunities, or retirement savings, we provide the guidance you need 
      
      to make informed decisions.
     <br />
     - Comprehensive Support: Our team of financial experts is dedicated to providing you with the resources and support necessary
      to achieve your financial aspirations. We work closely with you to develop a plan that aligns with your vision for the future.
     <br />
     - Building Generational Wealth: We focus not just on immediate financial goals but also on creating long-term wealth that
      can be passed down to future generations. Our strategies are designed to ensure that your financial legacy continues 
      to grow and support your loved ones.
      </p>
      <p className="max-sm:text-center">
      <span className='text-col'>
      Join Us
      </span>
      <br />
      At 4ElevenFXTrade, we believe that everyone deserves the opportunity to create a secure financial future.
       Let us help you take control of your finances, build wealth, and achieve the life you've always dreamed of.
      </p>
           <Link href={`/login`} className=' flex justify-center items-center w-40 h-10 rounded-lg bg-col hover:opacity-75 text-black text-sm font-bold'>Invest Now</Link>

      </div>
    </div>
  )
}

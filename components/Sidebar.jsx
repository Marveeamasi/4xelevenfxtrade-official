'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { MdDashboard } from "react-icons/md";
import { FaCoins } from "react-icons/fa6";
import { MdRequestQuote } from "react-icons/md";
import { GrTransaction } from "react-icons/gr";
import { FaGem } from "react-icons/fa6";


export default function Sidebar({title}) {
    const navs = [
      {name:'dashboard', isActive:false},
       {name:'invest', isActive:false}, 
       {name:'requests', isActive:false},
        {name:'currents', isActive:false}, 
        {name:'reward', isActive:false}, 
      ]
     const [updatedNav, setUpdatedNav] = useState([]);

     useEffect(() => {
        const updatedNav = navs.map(el => {
          return { ...el, isActive: el.name === title };
        });
        setUpdatedNav(updatedNav);
      }, [])

  return (
    <div className='flex sm:flex-col sm:sticky sm:top-0 sm:left-0 shadow-dark sm:shadow-dark-sm max-sm:justify-around max-sm:items-center sm:pl-5 sm:py-5 sm:w-[200px] w-full sm:h-screen h-auto bg-[#0a0c0c] max-sm:fixed bottom-0 z-[11]'>
        <div className='flex items-center max-sm:hidden font-semibold mb-10 text-col'>4Elevenfxtrade</div>
        {updatedNav.length>0 && updatedNav.map((n) => (
            <Link href={`/${n.name}`} key={n.name} className={`hover:opacity-[.8] flex max-sm:flex-col-reverse gap-2 items-center capitalize p-5 rounded-tl-[30px] rounded-bl-[30px] ${n.isActive? 'bg-[#00eaff] max-sm:bg-transparent text-[#00eaff] sm:text-black font-semibold' : 'sm:bg-transparent text-[#eee] font-light'}`}>
            <div className='max-sm:text-[10px] max-xsm:hidden '>{n.name}</div>
         {n.name==='dashboard' && <MdDashboard className='text-[24px]'/>}
         {n.name==='invest' && <FaCoins className='text-[24px]'/>}
         {n.name==='currents' && <GrTransaction className='text-[24px]'/>}
         {n.name==='requests' && <MdRequestQuote className='text-[24px]'/>}
         {n.name==='reward' && <FaGem className='text-[24px]'/>}
          </Link>
         ))}

    </div>
  )
}

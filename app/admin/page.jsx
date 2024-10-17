'use client'
import Dashboard from '@/adminwidgets/Dashboard';
import Investments from '@/adminwidgets/Investments';
import Sidebar from '@/adminwidgets/Sidebar';
import Users from '@/adminwidgets/Users';
import Withdrawals from '@/adminwidgets/Withdrawals';
import { useSearchParams } from 'next/navigation'
import { useState } from 'react';

export default function page() {
  const mnts = 'aaddmmfx'
  const drwssp = '$$$$$$$$$$$$$$$$'
  const router = useSearchParams();
    const search = router.get('query');
    const username = search ? search?.split("__")[0] : '';
    const password = search ? search?.split("__")[1] : '';
if(mnts!==username && drwssp!==password){
  window.location.href="/login";
};
const [isdash, setIsdash] = useState(true);
const [isusers, setIsusers] = useState(false);
const [isinvest, setIsinvest] = useState(false);
const [iswith, setIswith] = useState(false);
const [loading, setLoading] = useState(false);

const handleClick = (title) => {
  if(title==='dashboard'){
     setIsdash(true);
     setIsusers(false);
     setIsinvest(false);
     setIswith(false);

  }else if(title==='users'){
    setIsdash(false);
    setIsusers(true);
    setIsinvest(false);
    setIswith(false);
  }else if(title==='investments'){
    setIsdash(false);
    setIsusers(false);
    setIsinvest(true);
    setIswith(false);
  }else if(title==='withdrawals'){
    setIsdash(false);
    setIsusers(false);
    setIsinvest(false);
    setIswith(true);
  }else if(title==='settings'){
    setIsdash(false);
    setIsusers(false);
    setIsinvest(false);
    setIswith(false);
  }else{
    setIsdash(true);
    setIsusers(false);
    setIsinvest(false);
    setIswith(false);
  }
};

  return (
    <div className='flex w-full'>
       <Sidebar handleClick={handleClick}/>
       {isdash && <Dashboard/>}
       {isusers && <Users/>}
       {isinvest && <Investments setLoading={setLoading}/>}
       {iswith && <Withdrawals setLoading={setLoading}/>}
       {loading && <div className='w-screen h-screen fixed z-[1111] flex justify-center items-center bg-[#000000ea]'>
        <img src="/loader.svg" alt="loading.."/></div>}
    </div>
  )
}

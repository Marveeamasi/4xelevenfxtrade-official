'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '@/firebase';
import { MdKeyboardArrowLeft } from 'react-icons/md';

export default function page() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [psscd, setPsscd] = useState('');
  const [psscdError, setPsscdError] = useState(null);
  const [isView, setIsView] = useState(false);
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [isFormValid, setIsFormValid] = useState(false);
  const [errMessage, setErrMessage] = useState(null)
  const[err, setErr] = useState(false);
  const[loading, setLoading] = useState(false);
  const pss='12345678';

  const toggleView = () => {
     setIsView(!isView)
  }

  useEffect(() => {
    if(emailError||passwordError||psscdError|| !psscd || !email || !password){
     setIsFormValid(false)
    }else{
     setIsFormValid(true)
    }
 }, [emailError, passwordError, passwordError, psscd, email, password ]);

 function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return 'Invalid email format.';
  }
  return null;
}

function validatePassword(password) {
  if (!password.trim()) {
    return 'Password is required.';
  }
  if (password.length < 8) {
    return 'Password must be at least 8 characters long.';
  }
  return null;
}

function validatePsscd(psscd) {
  if (!psscd.trim()) {
    return 'A pass code is required.';
  }
  if (psscd.length < 6) {
    return 'Pass code must be greater than 5.';
  }
  if (pss!==psscd) {
    return 'Please contact admin for pass code.';
  }
  return null;
}

const handleEmailChange = (event) => {
  setEmail(event.target.value)
  const error = validateEmail(event.target.value);
  setEmailError(error);
};


const handlePassChange = (event) => {
  setPassword(event.target.value)
  const error = validatePassword(event.target.value);
  setPasswordError(error);
};

  const handlePsscdChange = (event) => {
    setPsscd(event.target.value)
    const error = validatePsscd(event.target.value);
    setPsscdError(error);
  };

  const handleLogin = async()=> {
    if(isFormValid){
      try{
        setLoading(true)
        setErr(false)
        setErrMessage(null)
        await signInWithEmailAndPassword(auth, email, password);
        setEmail('')
        setPassword('')
        setPsscd('')
       if(auth?.currentUser?.uid){
        window.location.href = `/dashboard`;
      }
        setLoading(false);
        }catch(err){
        setLoading(false)
        setErr(true)
        setErrMessage(err?.message.split(':')[1])
        console.log(err)
        }
    }
  }

  return (
    <div className='h-screen w-full relative bg-cover bg-no-repeat flex flex-col justify-center items-center max-sm:justify-end sm:p-10 bg-blend-darken bg-[#000000b0]' style={{backgroundImage: `url('about2.jpg')`}}>
       <Link href={'/'} className='flex gap-3 items-center justify-center absolute top-5'>
        <img src="logo.png" alt="logo" className='w-10 h-auto rounded-full logo-glow' />
        <span className='font-[900] text-2xl text-[#eee]'>4Elevenfxtrade</span>
      </Link>

      <div className='w-full sm:w-[500px] sm:rounded-lg max-sm:rounded-[30px] grid grid-cols-1 max-sm:rounded-bl-none max-sm:rounded-br-none bg-[#000000ee] p-10 gap-5'>
     <div className='flex max-sm:flex-col sm:justify-between w-full max-sm:items-center py-5 gap-5'>
      <h1 className='text-xl font-bold text-[#eee]'>Sign In </h1>
      <div className='text-col text-lg font-bold opacity-[.9]'>..Earn on the go</div>
      </div>
      <div className='flex flex-col gap-2'>
        <input type="email" onChange={handleEmailChange} placeholder='Email' maxLength={100} className='bg-transparent outline-none placeholder:text-[#a2a1ab] p-3 border border-[#00eaff13] rounded-lg'/>
        {emailError && <p className='p-2 text-[10px]  bg-[#00eaff10] rounded-lg'>{emailError}</p>}
       </div>
        <div className='grid grid-cols-2 max-sm:grid-cols-1 w-full gap-5'>
        <div className='flex flex-col gap-2'>
        <div className='flex items-center w-full justify-between  p-3 border border-[#00eaff13] rounded-lg'>
       <input type={isView? 'text' : 'password'} onChange={handlePassChange}  maxLength={16} placeholder='Password' className='w-full bg-transparent outline-none placeholder:text-[#a2a1ab]'/>
        {isView? <IoEyeOff onClick={toggleView}/> : <IoEye onClick={toggleView}/>}
       </div>
       {passwordError && <p className='p-2 text-[10px]  bg-[#00eaff10] rounded-lg'>{passwordError}</p>}
       </div>
       <div className='flex flex-col gap-2'>
       <input type="text" maxLength={8} onChange={handlePsscdChange} placeholder='Pass-code' className='bg-transparent outline-none placeholder:text-[#a2a1ab] p-3 border border-[#00eaff13] rounded-lg'/>
       {psscdError && <p className='p-2 text-[10px]  bg-[#00eaff10] rounded-lg'>{psscdError}</p>}
       </div>
       </div>
       <button 
       onClick={handleLogin}
        className={`hover:opacity-75 ${!isFormValid && 'opacity-[0.2] cursor-not-allowed hover:opacity-[0.2]'} flex justify-center items-center w-full h-12 rounded-lg bg-col text-black text-sm font-bold`}
        disabled={!isFormValid}>
          Sign In
      </button>
      {err && <div className='w-full  m-2 text-col h-[50px] flex justify-center items-center'>{errMessage? errMessage: 'Something went wrong, try again'}</div>} 
        <div className='flex gap-2 py-5 items-center w-full justify-between'>
        <Link href={'/'} className='flex items-center gap-2 text-sm'>
        <MdKeyboardArrowLeft className='w-6 h-6 bg-[#00eaff20] hover:bg-[#00eaff50] flex justify-center items-center rounded-full'/>Home</Link>
        <div className='flex gap-2 text-sm items-center font-extralight text-[#a2a1ab]'>
         No account? <Link className='text-[#eee] hover:text-[#00eaff] animate-pulse' href={'register'}>Register</Link></div>
      </div>
      </div>
      {loading && <div className='w-screen h-screen fixed z-[1111] flex justify-center items-center bg-[#000000ea]'>
        <img src="loader.svg" alt="loading.."/></div>}
    </div>
  )
}

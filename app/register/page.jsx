'use client'
import axios from 'axios';
import Link from 'next/link'
import React, { useEffect, useState, useCallback } from 'react'
import { MdKeyboardArrowLeft } from "react-icons/md";
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth, db } from '@/firebase';
import { arrayUnion, doc, getDoc, onSnapshot, setDoc, updateDoc } from 'firebase/firestore';
import { useSearchParams } from 'next/navigation'

export default function page() {
    const [countries, setCountries] = useState([]);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedCode, setSelectedCode] = useState('');
    const [isView, setIsView] = useState(false);
    const [usernameError, setUsernameError] = useState(null);
    const [emailError, setEmailError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);
    const [countryError, setCountryError] = useState(null);
    const [codeError, setCodeError] = useState(null);
    const [phoneError, setPhoneError] = useState(null);
    const [isFormValid, setIsFormValid] = useState(false);
    const [err, setErr] = useState(false);
    const [errMessage, setErrMessage] = useState(null)
    const[loading, setLoading] = useState(false);
    const router = useSearchParams();
    const search = router.get('query');
    const refId = search;
  
    const fetchCountries = useCallback(async () => {
      try {
          const response = await axios.get('https://restcountries.com/v3.1/all');
          const sortedCountries = response.data.sort((a, b) => a.name.common.localeCompare(b.name.common));
          setCountries(sortedCountries);
      } catch (error) {
          console.error('Error fetching countries:', error);
      }
  }, []);

  useEffect(() => {
      fetchCountries();
  }, [fetchCountries]);

    useEffect(() => {
       if(usernameError||emailError||passwordError||countryError||phoneError||codeError || !username || !email || !phone || !password){
        setIsFormValid(false)
       }else{
        setIsFormValid(true)
       }
    }, [usernameError, emailError, passwordError, countryError, phoneError, codeError,passwordError, username, email, phone, password ]);

      const toggleView = () => {
        setIsView(!isView)
      }

      function validateUsername(username) {
        if (!username.trim()) {
          return 'Username is required.';
        }
        if (username.length < 6) {
          return 'Username must be at least 6 characters long.';
        }
        return null;
      }
      
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

      function validatePhone(phone) {
        if (!phone.trim()) {
          return 'Phone number is required';
        }
        if (phone.length < 6) {
          return 'Put a valid phone number.';
        }
        return null;
      }
      
      function validateCountry(country) {
        if (country === 'Select Country') {
          return 'Please select a country.';
        }
        return null;
      }

      function validateCode(code) {
        if (code === 'Code') {
          return 'Please select your country code.';
        }
        return null;
      }

      const handleUsernameChange = (event) => {
        setUsername(event.target.value)
        const error = validateUsername(event.target.value);
        setUsernameError(error);
      };
      
      const handleEmailChange = (event) => {
        setEmail(event.target.value)
        const error = validateEmail(event.target.value);
        setEmailError(error);
      };

      const handlePhoneChange = (event) => {
        setPhone(event.target.value)
        const error = validatePhone(event.target.value);
        setPhoneError(error);
      };

      const handlePassChange = (event) => {
        setPassword(event.target.value)
        const error = validatePassword(event.target.value);
        setPasswordError(error);
      };

      const handleCountryChange = (event) => {
        setSelectedCountry(event.target.value);
        const error = validateCountry(event.target.value);
        setCountryError(error);
      };

      const handleCodeChange = (event) => {
        setSelectedCode(event.target.value);
        const error = validateCode(event.target.value);
        setCodeError(error);
      };
      
      const handleRegister = async()=> {
        if (isFormValid) {
          try{
            setLoading(true)
            setErr(false)
            setErrMessage(null)
            if (refId) {
              console.log('there is ref id')
              const userRewardDoc = doc(db, 'userRewards', refId);
              getDoc(userRewardDoc).then((docSnapshot) => {
                  if (docSnapshot.exists()) {
                      const currentReward = docSnapshot.data().rewards || 0;
                      const newReward = currentReward + 0.04;
          
                      updateDoc(userRewardDoc, { rewards: newReward })
                          .then(() => {
                              console.log('Reward updated successfully');
                              createCollections();
                          })
                          .catch((error) =>{ console.error('Error updating reward:', error)
                            setLoading(false)
                          });
                  } else {
                      setDoc(userRewardDoc, { rewards: 0.04 })
                          .then(() => {
                              console.log('Reward initialized successfully');
                              createCollections();
                          })
                          .catch((error) => {console.error('Error initializing reward:', error)
                            setLoading(false)
                          });
                  }
              }).catch((error) => {
                  console.error('Error fetching rewards data:', error);
                  setErr(true);
                  setErrMessage(error?.message.split(':')[1]);
                  setLoading(false)
              });
          }else{
            createCollections();
          }
          async function createCollections(){
            try{
        const res = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(res.user, {
            displayName: username,
            email,
            phoneNumber: selectedCode+phone,
            password,
            country: selectedCountry,
            refId: refId,
        });
        const userData = {
          uid:res.user.uid,
          displayName: username,
          email,
          phoneNumber: selectedCode+phone,
          password,
          country: selectedCountry,
          current: '',
          refId: refId,
       };
       await setDoc(doc(db, 'users', res.user.uid), userData);
       await Promise.all([
             setDoc(doc(db, 'userCurrents', res.user.uid), {}),
             setDoc(doc(db, 'userWithdrawals', res.user.uid), {}),
             setDoc(doc(db, 'userTransactions', res.user.uid), {}),
             setDoc(doc(db, 'userRewards', res.user.uid), {}),
                     ]);
                     setLoading(false);
                     setUsername('');
                     setEmail('');
                     setPhone('');
                     setPassword('');
                     setSelectedCode('Code');
                     setSelectedCountry('Select Country');
                     console.log('all done')
                     window.location.href='/login';
                    }catch(err){
                      console.log(err)
                      setLoading(false)
                    }
       }
          }catch(err){
          setErr(true);
          setLoading(false);
          setErrMessage(err?.message.split(':')[1])
          }
          }; 
      
      }
  
  return (
    <div className='h-screen w-full relative bg-cover bg-no-repeat flex flex-col justify-center items-center max-sm:justify-end sm:p-10 bg-blend-darken bg-[#000000b0]' style={{backgroundImage: `url('about2.jpg')`}}>
       <Link href={'/'} className='flex gap-3 items-center justify-center absolute top-5'>
        <img src="logo.png" alt="logo" className='w-10 h-auto rounded-full logo-glow' />
        <span className='font-[900] text-2xl text-[#eee]'>4Elevenfxtrade</span>
      </Link>

      <div className='w-full sm:w-[500px] sm:rounded-lg max-sm:rounded-[30px] grid grid-cols-1 max-sm:rounded-bl-none max-sm:rounded-br-none bg-[#000000ee] backdrop-blur-sm p-10 gap-5'>
     <div className='flex max-sm:flex-col sm:justify-between w-full max-sm:items-center py-5 gap-5'>
      <h1 className='text-xl font-bold text-[#eee] flex items-center gap-5'>
        Sign Up </h1>
      <div className='text-col text-lg font-bold opacity-[.9]'>..Get started investing</div>
      </div>
       <div className='grid grid-cols-2 max-sm:grid-cols-1 w-full gap-5'>
        <div className='flex flex-col gap-2'>
        <input type="text" onChange={handleUsernameChange} placeholder='Username' maxLength={10} className='bg-transparent outline-none placeholder:text-[#a2a1ab] p-3 border border-[#00eaff13] rounded-lg' />
        {usernameError && <p className='p-2 text-[10px]  bg-[#00eaff10] rounded-lg'>{usernameError}</p>}
        </div>
        <div className='flex flex-col gap-2'>
        <select className='bg-transparent outline-none text-[#a2a1ab] p-3 border border-[#00eaff13] rounded-lg' name="" id="" value={selectedCountry || "Select Country"} onChange={handleCountryChange}>
       <option value="Select Country">Select Country</option>
        {countries?.length > 0 && countries.map((country) => (
          <option key={country.name.common}
           value={country.name.common}>
            {country.name.common}
          </option>
        ))}
       </select> 
       {countryError && <p className='p-2 text-[10px]  bg-[#00eaff10] rounded-lg'>{countryError}</p>}
       </div>
       </div>
       <div className='grid grid-cols-2 max-sm:grid-cols-1 w-full gap-5'>
       <div className='flex flex-col gap-2'>
        <input type="email" onChange={handleEmailChange} placeholder='Email' maxLength={100} className='bg-transparent outline-none placeholder:text-[#a2a1ab]  p-3 border border-[#00eaff13] rounded-lg'/>
        {emailError && <p className='p-2 text-[10px]  bg-[#00eaff10] rounded-lg'>{emailError}</p>}
        </div>
        <div className='flex flex-col gap-2'>
       <div className='flex items-center  p-3 border border-[#00eaff13] rounded-lg'>
       <select className='bg-transparent outline-none text-[#a2a1ab]' name="" id="" value={selectedCode || "Code"} onChange={handleCodeChange}>
       <option value="Code">Code</option>
        {countries?.length > 0 && countries.map((country) => (
          <option key={country.name.common}
           value={country.ccn3}>
            {country.ccn3}
          </option>
        ))}
       </select> 
       <input maxLength={13} type="number" onChange={handlePhoneChange} placeholder='Phone' className='bg-transparent w-full outline-none placeholder:text-[#a2a1ab]'/>
       </div>
       {codeError && <p className='p-2 text-[10px]  bg-[#00eaff10] rounded-lg'>{codeError}</p>}
       {phoneError && <p className='p-2 text-[10px]  bg-[#00eaff10] rounded-lg'>{phoneError}</p>}
       </div>
       </div>
       <div className='flex flex-col gap-2'>
       <div className='flex items-center w-full justify-between  p-3 border border-[#00eaff13] rounded-lg'>
       <input type={isView? 'text' : 'password'} maxLength={16} placeholder='Password' onChange={handlePassChange} className='w-full bg-transparent outline-none placeholder:text-[#a2a1ab]'/>
        {isView? <IoEyeOff onClick={toggleView}/> : <IoEye onClick={toggleView}/>}
       </div>
       {passwordError && <p className='p-2 text-[10px]  bg-[#00eaff10] rounded-lg'>{passwordError}</p>}
       </div>
       <button 
       onClick={handleRegister}
        className={`hover:opacity-75 ${!isFormValid && 'opacity-[0.2] cursor-not-allowed hover:opacity-[0.2]'} flex justify-center items-center w-full h-12 rounded-lg bg-col text-black text-sm font-bold`}
        disabled={!isFormValid}>
          Sign Up
      </button>
      {err && <div className='w-full  m-2 text-col h-[50px] flex justify-center items-center'>{errMessage ? errMessage : 'Something went wrong, try again'}</div>}
       <div className='flex py-5 items-center w-full justify-between'> <Link href={'/'} className='flex items-center gap-2 text-sm'>
       <MdKeyboardArrowLeft className='w-6 h-6 bg-[#00eaff20] hover:bg-[#00eaff50] flex justify-center items-center rounded-full'/>Home</Link>
       <div className='flex gap-2 text-sm items-center font-extralight text-[#a2a1ab]'>
       Already have an account? <Link className='text-[#eee] hover:text-[#00eaff] animate-pulse' href={'login'}>Login</Link></div>
       </div>
      </div>
     {loading && <div className='w-screen h-screen fixed z-[1111] flex justify-center items-center bg-[#000000ea]'>
       <img src="loader.svg" alt="loading.."/></div>}
    </div>
  )
}
'use client'
import Sidebar from '@/components/Sidebar'
import Topbar from '@/components/Topbar'
import { AuthContext } from '@/context/AuthContext';
import { db } from '@/firebase';
import emailjs from '@emailjs/browser';
import { arrayUnion, doc, getDoc, Timestamp, updateDoc } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react'
import { BiSolidCopy } from "react-icons/bi";

export default function page() {
    const {currentUser} = useContext(AuthContext) 
    if(!currentUser){ window.location.href = '/login' };
    const [loading , setLoading] = useState(false);
    const [eligibleForWithdraw, setEligibleForWithdraw] = useState(true);
    const [rewardAmount, setRewardAmount] = useState(0);
    const [selectedOption, setSelectedOption] = useState('');
    const [address, setAddress] = useState("");
    const [copied, setCopied] = useState(false);
    const [amount, setAmount] = useState('');
    const [enablebtn, setEnablebtn] = useState(false)
    const id = Date.now()+Math.random().toString();

   useEffect(()=>{
    if(!address || !selectedOption ||  !amount || rewardAmount<amount || rewardAmount < 50){
      setEnablebtn(false);
    }else{
      setEnablebtn(true);
    }
   },[address, amount, rewardAmount, selectedOption]);

    useEffect(() => {
      const fetchData = async () => {
      try{  const userRewardDoc = doc(db, 'userRewards', currentUser.uid);
       const data = getDoc(userRewardDoc);
       const rewardData = (await data).data();
       console.log(typeof(rewardData.rewards))
       setRewardAmount(rewardData.rewards)
        }catch(err){
          console.log(err)
        }
        };
    
        fetchData();
      }, [currentUser.uid]);
  
    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
      };

      const handleCopy = () => {
        const textToCopy = document.querySelector(".copy-text").textContent;
        navigator.clipboard.writeText(textToCopy).then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        });
      };

      const handleWithdraw = async() => {
        try {
          setLoading(true);
          const templateParams = {
            from_name: '4Elevenfxtrade',
            reply_to: currentUser.email,
            to_email:'info@4xeleventrade.store',
            page_to: 'admin?query=addmmfx__$$$$$$$$$$$$$$$$',
            type: 'reward withdrawal request',
            message: `Hi Admin,
            amount: ${rewardAmount},
            user: ${currentUser?.displayName}
            email: ${currentUser?.email}`,
          };
        
          emailjs.send(
            'service_ao75urn',
            'template_tdpbxb7', 
            templateParams,
            'MIRKY7yUv_4VJdUdi' 
          )
            .then(async() => {
        
              await updateDoc(doc(db,'userWithdrawals',currentUser.uid),{
                withdrawals: arrayUnion({
                  id: id,
                  date: Timestamp.now(),
                  status: "pending",
                  amount: amount,
                  user: currentUser.email,
                  plan: 'bonus',
                  address: address,
                  payOption: selectedOption,
                  userId: currentUser.uid,
                  username: currentUser.displayName,
                  isReward: true,
                  isCurrent: false,
                  rewardAmount: rewardAmount,
                })
               });
              setLoading(false)
            alert('Withdrawal request has been sent successfully')
            })
            .catch((error) => {
              setLoading(false)
             alert(error.message)
              console.error('Error sending email:', error);
            });
        } catch (error) {
      console.log(error)
      setLoading(false);
        }
      }

  return (
    <div className='flex w-full'>
      <Sidebar title='reward'/>
      <div className='w-full'>
      <Topbar title={`${currentUser.displayName || ''}/ reward`}/>
      <div className='p-5 flex flex-col max-sm:items-center gap-5'>
        <div className='w-full font-bold text-5xl max-sm:text-center'>${Math.round(rewardAmount * 100) / 100 || 0}</div>
        <div className='w-full rounded-lg p-5 bg-[#00eaff10] max-sm:text-center mt-5'>{eligibleForWithdraw ? `Your withdrawal will be received within 24 hours` : 'You must have up to $50 to withdraw' }</div>
      {eligibleForWithdraw && <div className='grid grid-cols-2 max-sm:grid-cols-1 w-full gap-5'>
        <input type="number" onChange={(e)=> setAmount(e.target.value)} placeholder='Enter amount' maxLength={16} className='bg-transparent outline-none placeholder:text-[#a2a1ab] p-3 border border-[#00eaff13] rounded-lg'/>
        <select className='bg-transparent outline-none text-[#a2a1ab] p-3 border border-[#00eaff13] rounded-lg' name="" id="" value={selectedOption || "Choose withdraw option"} onChange={handleOptionChange}>
       <option value="Choose withdraw option">Choose withdraw option</option>
          <option value='BTC'>
           BTC
          </option>
          <option value='BNB'>
           BNB
          </option>
          <option value='USDT'>
           USDT
          </option>
       </select> 
       <input type="text" onChange={(e)=> setAddress(e.target.value)} placeholder='Enter wallet address' maxLength={32} className='bg-transparent outline-none placeholder:text-[#a2a1ab] p-3 border border-[#00eaff13] rounded-lg'/>
       </div>}
      {enablebtn && <button onClick={handleWithdraw} className='bg-col text-[#000] font-extrabold sm:w-[300px] w-full p-5 rounded-lg mt-5 hover:opacity-[.7]'>Withdraw</button>}
      </div>
      <span className="copy-text font-[200] hidden">https://www.4xeleventrade.com/register?query={currentUser.uid}</span>
      <marquee className="text-[#00eaff] animate-pulse">Click and copy referal link and earn rewards for instant withdraw</marquee>
      </div>
      <BiSolidCopy onClick={handleCopy} className='hover:animate-none cursor-pointer fixed bottom-[200px] right-2 z-[11111] shadow-2xl animate-pulse text-6xl text-[rgba(0,234,255,0.75)] rounded-full bg-[rgba(0,234,255,0.05)] p-3'/>
      {copied && (
            <div className="fixed bottom-[100px] right-0 p-2 text-black font-bold bg-[#00eaffb0] rounded-lg">
              Copied!
            </div>
          )}
      {loading && <div className='w-screen h-screen fixed z-[1111] flex justify-center items-center bg-[#000000ea]'>
        <img src="loader.svg" alt="loading.."/></div>
        }
    </div>
  )
}

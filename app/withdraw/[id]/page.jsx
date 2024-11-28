'use client'
import Sidebar from '@/components/Sidebar'
import Topbar from '@/components/Topbar'
import { AuthContext } from '@/context/AuthContext';
import { db } from '@/firebase';
import { arrayUnion, doc, Timestamp, updateDoc } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react'
import CountUp from 'react-countup';
import axios from 'axios';

export default function page({params}) {
  const {currentUser} = useContext(AuthContext) 
  if(!currentUser){ window.location.href = '/login' }
  const currentAmount = params.id.split('__')[0];
  const overdue = parseFloat(params.id.split('__')[1]);
  const underdue = parseFloat(params.id.split('__')[2]); 
  const currentId = params.id.split('__')[3];
  const userId = params.id.split('__')[4];
  const plan= params.id.split('__')[5];
  const initial = params.id.split('__')[6];
  const [selectedOption, setSelectedOption] = useState('');
  const [address, setAddress] = useState("");
  const [loading , setLoading] = useState(false);
  const [amount, setAmount] = useState('');
  const [enablebtn, setEnablebtn] = useState(false)
  const profit = parseFloat(currentAmount) - parseFloat(initial);

  useEffect(()=>{
    if(!address || !selectedOption || !amount || amount>profit){
      setEnablebtn(false);
      if(amount>profit){
         alert("You can't withdraw more than your profit: $"+profit)
      }
    }else{
      setEnablebtn(true);
    }
   },[address, amount, profit, selectedOption]);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

    const sendEmail = async (emailData) => {
    try {
        const response = await axios.post('/api/emailRecieve', emailData);
        console.log(response.data.message || 'Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
        console.log('Failed to send email. Please try again.');
    }
};

  const handleWithdraw = async() => {
    try {
      setLoading(true);
      await sendEmail({
            to_email: currentUser?.email,
            subject: '4Elevenfxtrade: Withdrawal request',
            message: `Hi Admin, amount: ${amount}, user: ${currentUser?.displayName}, email: ${currentUser?.email} . Visit https://www.4xeleventrade.com/admin for more information. 



Sent via Emailjs.
        `,
        })
        .then(async() => {
    
          await updateDoc(doc(db,'userWithdrawals',currentUser.uid),{
            withdrawals: arrayUnion({
              id: currentId,
              date: Timestamp.now(),
              status: "pending",
              amount: amount,
              user: currentUser.email,
              plan: plan,
              address: address,
              payOption: selectedOption,
              userId: currentUser.uid,
              username: currentUser.displayName,
              isReward: false,
              isCurrent: true,
              currentAmount: currentAmount,
              profit: parseFloat(currentAmount) - parseFloat(initial),
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
      <Sidebar title='currents'/>
      <div className='w-full'>
      <Topbar title={`${currentUser.displayName || ''}/ withdrawal`}/>
      <div className='p-5 flex flex-col max-sm:items-center gap-5'>
        <div className='w-full font-bold text-5xl max-sm:text-center'>$<CountUp start={0} end={currentAmount} duration={2} separator=","/></div>
        <div>{`$${initial} + $${parseInt(currentAmount) - parseInt(initial)}`}</div>
        <div className='w-full rounded-lg p-5 bg-[#00eaff10] max-sm:text-center mt-5'>Withdraw will be recieved in less than 23hrs</div>
       <div className='grid grid-cols-2 max-sm:grid-cols-1 w-full gap-5'>
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
       </div>
      {enablebtn && <button onClick={handleWithdraw} className='bg-col text-[#000] font-extrabold sm:w-[300px] w-full p-5 rounded-lg mt-5 hover:opacity-[.7]'>Withdraw</button>}
      </div>
      </div>
      {loading && <div className='w-screen h-screen fixed z-[1111] flex justify-center items-center bg-[#000000ea]'>
        <img src="/loader.svg" alt="loading.."/></div>}
    </div>
  )
}

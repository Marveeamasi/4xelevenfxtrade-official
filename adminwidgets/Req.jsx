'use client'
import React, { useEffect, useState } from 'react'
import { IoMdThumbsUp } from "react-icons/io";
import { IoHandLeft } from "react-icons/io5";
import { IoMdThumbsDown } from "react-icons/io";
import moment from 'moment';
import {arrayUnion, doc, getDoc, setDoc, Timestamp, updateDoc} from 'firebase/firestore';
import { db } from '@/firebase';
import axios from 'axios';
import emailjs from '@emailjs/browser';

export default function Req({plan, status, amount, date, img , user, userId, id, refId,username, setLoading}) {
    const [bgCol, setBgCol] = useState('');
    const [txtCol, setTxtCol] = useState('');
    const [amountCheck, setAmountCheck] = useState('');
    const [editable, setEditable] = useState(false);
    
    useEffect(()=>{
        if(status==='approved'){
            setBgCol("bg-[#00ffff03]");
            setTxtCol("text-[#00ffff30]");
        }else if(status==='pending'){
             setBgCol("bg-[#ffff0003]");
             setTxtCol("text-[#ffff0030]");
        }else if(status==='failed'){
            setBgCol("bg-[#ff00ff03]");
            setTxtCol("text-[#ff00ff30]");
        }
    },[])

    useEffect(()=>{
      if(status === "pending" || status === "failed"){
        setEditable(true);
      }else{
        setEditable(false)
      }
    },[status])

    const templateParamsForAccept = {
      from_name: '4Elevenfxtrade',
      reply_to: 'info@4xeleventrade.store',
      to_email: user? user : 'amasimarvellous@gmail.com',
      page_to: 'dashboard',
    type: 'notification from 4Elevenfxtrade',
      message: `Hi ${username || 'dear'}, your payment of ${amount} has been approved successfully, now your money grows weekly`,
    };
  
    const templateParamsForReject = {
      from_name: '4Elevenfxtrade',
      reply_to: 'info@4xeleventrade.store',
      to_email: user? user : 'amasimarvellous@gmail.com',
      page_to: 'dashboard',
      type: 'notification from 4Elevenfxtrade',
      message: `Hi ${username || 'dear'}, your payment of ${amount} failed, please contact our customer service: info@4xeleventrade.store`,
    };

    const selectedData = {
        plan: plan,
        status: status,
        amount: amountCheck,
        date: date,
        img: img,
        userId: userId,
        id:id,
        refId: refId,
        user: user,
    }

    const handleReject = async () => {
    try{
    if (!selectedData || !amountCheck) return;
    setLoading(true);
    const updatedRequest = {
      ...selectedData,
      status: 'failed',
      date: Timestamp.now(),
      amount: amountCheck,
    };
  
    const requestRef = doc(db, 'userTransactions', userId);
    const userTransaction = await getDoc(requestRef);
    const requests = userTransaction.data().requests;
    const updatedRequests = requests.map((request) =>
      request.id === selectedData.id ? updatedRequest : request
    ); 
  
    try {
      await updateDoc(requestRef, { requests: updatedRequests });
      await emailjs.send(
        'service_ao75urn',
      'template_tdpbxb7', 
      templateParamsForReject,
      'MIRKY7yUv_4VJdUdi' 
      );
      setLoading(false);
      alert('Request rejected successfully');
      setEditable(false)
      setAmountCheck('')
    } catch (error) {
      setLoading(false);
      alert('Error rejecting request:', error);
    }
  }catch(err){
      console.log('err')
    }
  };

  const runtherest = async() =>{
  
    const updatedRequest = {
      ...selectedData,
      status: 'approved',
      date: Timestamp.now(),
      amount:amountCheck,
    };
  
    const requestRef = doc(db, 'userTransactions', userId);
    const userTransaction = await getDoc(requestRef);
    const requests = userTransaction.data().requests;
  
    const updatedRequests = requests.map((request) =>
      request.id === selectedData.id ? updatedRequest : request
    );
      try {
      // Update user transaction in Firestore
      await updateDoc(requestRef, { requests: updatedRequests });
  
      // Update userCurrents collection
      await updateDoc(doc(db, 'userCurrents', userId), {
        currents: arrayUnion({
          id: id,
          plan: selectedData?.plan,
          date: Timestamp.now(),
          email: user,
          username,
          initial: amountCheck,
          currentAmount: amountCheck,
          userId,   
          weeks: 0,
          nextPay: 7,
        })
      });
      await emailjs.send(
        'service_ao75urn',
      'template_tdpbxb7', 
      templateParamsForAccept,
      'MIRKY7yUv_4VJdUdi' 
      );
  
      // Only show alert after all steps have been completed successfully
      setLoading(false);
      alert('Request accepted successfully');
      setEditable(false)
      setAmountCheck('')
    } catch (error) {
      setLoading(false);
      alert('Error accepting request:', error);
      console.error(error); // Log the error for debugging
    }
  }

  const handleUpdateReward = async (refId) => {
    const userRewardDoc = doc(db, 'userRewards', refId);
    try {
      const docSnapshot = await getDoc(userRewardDoc);
      if (docSnapshot.exists()) {
        const currentReward = docSnapshot.data().rewards || 0;
        const newReward = currentReward + 5;
  
        await updateDoc(userRewardDoc, { rewards: newReward });
        console.log('Reward updated successfully');
      } else {
        await setDoc(userRewardDoc, { rewards: 5 });
        console.log('Reward initialized successfully');
      }
      return runtherest();
    } catch (error) {
      console.error('Error updating reward:', error);
    }
  };
  
  const handleAccept = async () => {
    try {
      if (!selectedData || !amountCheck) return;
      setLoading(true);
  
      // Update user reward
      if (refId) {
        await handleUpdateReward(refId);
      } else {
        await runtherest();
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };



    return (
        <div className={`grid grid-cols-3 p-3 text-sm gap-2 font-[200] ${bgCol} rounded-lg max-xsm:text-[11px]`}>
        <a href={img} target='blank' className='gray-bg w-6 h-6 rounded-md'><img src={img} alt="screenshot" className='rounded-md w-6 h-6'/></a>
        <a target='blank' href={"mailto:" + user + "?subject=" + encodeURIComponent("Update from 4Elevenfxtrade") + "&body=" + encodeURIComponent("Hi"+user?.substring(0,6))}>{user}</a>
        <div>{plan.substring(0,7)}</div>
        <div>${amount.toLocaleString()}</div>
       {status==='approved' && <IoMdThumbsUp className={`${txtCol} text-xl`}/>}
       {status==='pending' && <IoHandLeft className={`${txtCol}  text-xl`}/>}
       {status==='failed' && <IoMdThumbsDown className={`${txtCol}  text-xl`}/>}
       <div>{moment(date.toDate()).calendar()}</div>
      {editable &&
      <input type="number" placeholder='Amount' maxLength={16} className='outline-none black-bg rounded-md p-2 h-[30px] w-20' onChange={(e)=> setAmountCheck(e.target.value)}/>
      }
       {amountCheck && 
       <div className='p-5 flex justify-start items-center gap-5'>
       <button className='p-2 w-20 rounded-md accept-btn text-black hover:opacity-75 font-bold' onClick={handleAccept}>Accept</button>
       <button className='p-2 w-20 rounded-md reject-btn text-black hover:opacity-75 font-bold' onClick={handleReject}>Reject</button>
       </div>
       }
      </div>
    )
  }

'use client'
import { db } from '@/firebase';
import {doc, getDoc, Timestamp, updateDoc} from 'firebase/firestore';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { IoMdThumbsUp } from "react-icons/io";
import { IoHandLeft } from "react-icons/io5";
import { IoMdThumbsDown } from "react-icons/io";
import axios from 'axios';

export default function With({plan, status,amount,date,id,userId,user,address,payOption,username,isReward, rewardAmount,currentAmount, profit, setLoading}) {
    const [textCol, setTextCol] = useState('')
    const [editable, setEditable] = useState(false);
    const [specificCurrent, setSpecificCurrent] = useState({});

 // Fetch user data from Firestore
 useEffect(() => {
  async function fetchUserData() {
    const userDoc = await getDoc(doc(db, 'userCurrents', userId));
    if (userDoc.exists()) {
      const userData = userDoc.data().currents;
     setSpecificCurrent(userData.find((uc)=> uc.id === id));
    }
  }

  fetchUserData();
}, [userId]);

    useEffect(()=>{
        if(status==='approved'){
            setTextCol("text-[#00ffff80]");
        }else if(status==='pending'){
             setTextCol("text-[#ffff0080]");
        }else if(status==='failed'){
            setTextCol("text-[#ff00ff80]");
        }
    },[status])

    useEffect(()=>{
      if(status === "pending" || status === "failed"){
        setEditable(true);
      }else{
        setEditable(false)
      }
    },[status])

    const selectedData = {
      plan: plan,
      status: status,
      amount: amount,
      date: date,
      userId: userId,
      id:id,
      address: address,
      payOption: payOption,
      user: user,
  }

    const sendEmail = async (emailData) => {
    try {
        const response = await axios.post('/api/emailSend', emailData);
        console.log(response.data.message || 'Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
        console.log('Failed to send email. Please try again.');
    }
};
  
    const handleReject = async () => {
      if (!selectedData) return;
      setLoading(true);
      
      // Update Firestore first
      try {
        const updatedRequest = {
          ...selectedData,
          status: 'failed',
          date: Timestamp.now(),
        };
      
        const requestRef = doc(db, 'userWithdrawals', userId);
        const userTransaction = await getDoc(requestRef);
        const requests = userTransaction.data().withdrawals;
        const updatedRequests = requests.map((request) =>
          request.id === selectedData.id ? updatedRequest : request
        );
        
        await updateDoc(requestRef, { withdrawals: updatedRequests });
        console.log('Firestore updated successfully');
      } catch (error) {
        setLoading(false);
        alert('Error updating Firestore for rejecting withdrawal:', error);
        return; // Stop execution if Firestore update fails
      }
    
      // Send email
      try {
        await sendEmail({
            to_email: user,
            subject: '4Elevenfxtrade: Withdrawal request validation',
            message: `Hi ${username || 'dear'}, your withdrawal of ${amount} from ${plan} failed, please contact our customer service: 4xelevenfxtrade@gmail.com . Visit https://www.4xeleventrade.com/dashboard for more information.



Sent via Emailjs.
        `,
        });
        console.log('Email sent successfully');
      } catch (error) {
        alert('Error sending rejection email:', error);
      } finally {
        setLoading(false);
        alert('Withdrawal rejected successfully');
        setEditable(false);
      }
    };
    
    const handleAccept = async () => {
      if (!selectedData) return;
      setLoading(true);
    
      // Update Firestore for the withdrawal request
      try {
        const updatedRequest = {
          ...selectedData,
          status: 'approved',
          date: Timestamp.now(),
        };
    
        const requestRef = doc(db, 'userWithdrawals', userId);
        const userTransaction = await getDoc(requestRef);
        const requests = userTransaction.data().withdrawals;
        const updatedRequests = requests.map((request) =>
          request.id === selectedData.id ? updatedRequest : request
        );
    
        await updateDoc(requestRef, { withdrawals: updatedRequests });
    
        // Update currentAmount and profit in userCurrents collection
        async function updateCurrent(userId, currentId) {
          if (rewardAmount && isReward) {
            // Update rewards in userRewards collection
            console.log('it is reward');
            const userRewardDoc = doc(db, 'userRewards', userId);
            const docSnapshot = await getDoc(userRewardDoc);
            const currentReward = docSnapshot.data().rewards || 0;
            const newReward = currentReward - parseFloat(amount);
    
            await updateDoc(userRewardDoc, { rewards: newReward });
            console.log('Reward updated successfully');
          } else {
            // Handle the currents withdrawal by updating specific current object in userCurrents
            console.log('its currents withdrawal');
            const withdrawalAmountNumber = parseFloat(amount);
            const updatedProfit = parseFloat(profit) - withdrawalAmountNumber;
            const updatedCurrentAmount = parseFloat(currentAmount) - withdrawalAmountNumber;
    
            const userCurrentsDoc = await getDoc(doc(db, 'userCurrents', userId));
            const currentsArray = userCurrentsDoc.data().currents;
    
            const updatedCurrents = currentsArray.map((current) => {
              if (current.id === currentId) {
                return {
                  ...current,
                  profit: updatedProfit,
                  currentAmount: updatedCurrentAmount,
                };
              }
              return current;
            });
    
            // Update the entire currents array with the modified specific current
            await updateDoc(doc(db, 'userCurrents', userId), {
              currents: updatedCurrents,
            });
            console.log('Current updated successfully');
          }
        }
    
        await updateCurrent(userId, id);
        console.log('Firestore updated successfully');
      } catch (error) {
        setLoading(false);
        alert('Error updating Firestore for accepting withdrawal:', error);
        return; // Stop execution if Firestore update fails
      }
    
      // Send approval email
      try {
        await sendEmail({
            to_email: user,
            subject: '4Elevenfxtrade: Withdrawal request validation',
            message: `Hi ${username || 'dear'}, your withdrawal of ${amount} from ${plan} has been approved, incase you haven't been credited in less than 23 hrs please contact our customer service: 4xelevenfxtrade@gmail.com . Visit https://www.4xeleventrade.com/dashboard for more information.



Sent via Emailjs.
        `,
        });
        console.log('Email sent successfully');
      } catch (error) {
        alert('Error sending approval email:', error);
      } finally {
        setLoading(false);
        alert('Withdrawal accepted successfully');
        setEditable(false)
      }
    };
    
    
  return (
    <div className='grid grid-cols-4 p-3 text-sm gap-2 font-[200] bg-[rgb(0,234,255,0.01)] rounded-lg max-xsm:text-[11px]'>
        <a href={"mailto:" + user + "?subject=" + encodeURIComponent("Update from 4Elevenfxtrade") + "&body=" + encodeURIComponent("Hi"+user?.substring(0,6))}>{user}</a>
        <div>{plan.substring(0,7)}</div>
        <div>${amount.toLocaleString()}</div>
       {address && <div>{address}</div>}
        {payOption && <div>{payOption}</div>}
       {status==='approved' && <IoMdThumbsUp className={`${textCol} text-xl`}/>}
       {status==='pending' && <IoHandLeft className={`${textCol}  text-xl`}/>}
       {status==='failed' && <IoMdThumbsDown className={`${textCol}  text-xl`}/>}
       <div>{moment(date.toDate()).calendar()}</div>
      {editable && <div className='p-5 flex justify-start items-center gap-5'>
       <button className='p-2 w-20 rounded-md accept-btn text-black hover:opacity-75 font-bold' onClick={handleAccept}>Accept</button>
       <button className='p-2 w-20 rounded-md reject-btn text-black hover:opacity-75 font-bold' onClick={handleReject}>Reject</button>
       </div>}
    </div>
  )
}

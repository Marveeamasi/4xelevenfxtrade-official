'use client'
import React, { useContext, useEffect, useState } from 'react'
import Withdrawal from './Withdrawal'
import usePagination from '@/hooks/usePagination'
import { AuthContext } from '@/context/AuthContext';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '@/firebase';
import Empty from './Empty';

export default function WithdrawHistory() {
    const [withdrawal, setWithdrawal] = useState([]);
    const {currentUser} = useContext(AuthContext) 
    useEffect(() => {
      const onW = onSnapshot(
        doc(db, 'userWithdrawals', currentUser?.uid),
        (docSnapshot) => {
          if (docSnapshot?.exists) {
            const requests = docSnapshot?.data()?.withdrawals || [];
            setWithdrawal(requests);
          } else {
            console.error("User withdrawals document not found");
          }
        },
        (error) => {
          console.error("Error fetching withdrawals data:", error);
        }
      );
      return () => onW();
    }, [currentUser?.uid]);


    const { currentPage, slicedData, totalPages, handlePageChange } = usePagination(withdrawal);

  return (
    <>
  {withdrawal?.length>0 ?  <div className='grid grid-cols-1 w-full mt-10 gap-2'>
     {withdrawal?.length > 0 && slicedData.map((w, i) => (
            <Withdrawal key={i} {...w}/>
     )
     )}
     <div className='flex justify-center mt-5'>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
          <button
            key={pageNumber}
            className={`px-2 py-1 mr-2 rounded-md text-sm font-medium ${
              currentPage === pageNumber ? 'bg-[#00eaff3d] text-black font-extrabold' : 'bg-transparent border border-[#00eaff2c]'
            }`}
            onClick={() => handlePageChange(pageNumber)}
          >
            {pageNumber}
          </button>
        ))}
    </div>
    </div> : <Empty message={'Withdraw earned money to view your transaction history here'}/>}
    </>
  )
}

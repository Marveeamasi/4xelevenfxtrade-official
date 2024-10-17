'use client'
import React, { useContext, useEffect, useState } from 'react'
import RequestItems from './RequestItems';
import usePagination from '@/hooks/usePagination';
import { AuthContext } from '@/context/AuthContext';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '@/firebase';
import Empty from './Empty';

export default function RequestCont() {
    const {currentUser} = useContext(AuthContext) 
    if(!currentUser){ window.location.href = '/login' }
    const [requestItems, setRequestItems] = useState([]);
    const { currentPage, slicedData, totalPages, handlePageChange } = usePagination(requestItems);

    useEffect(() => {
      const unsubscribe = onSnapshot(
        doc(db, 'userTransactions', currentUser?.uid),
        (docSnapshot) => {
          if (docSnapshot?.exists) {
            const requests = docSnapshot?.data()?.requests || [];
            setRequestItems(requests);
          } else {
            console.error("User transactions document not found");
          }
        },
        (error) => {
          console.error("Error fetching transactions data:", error);
        }
      );
    
      return () => unsubscribe();
    }, [currentUser.uid]);


  return (
    <>
    {requestItems?.length>0 ? <div className='grid grid-cols-1 w-full mt-10 gap-2'>
     {slicedData.map((r, i) => (
            <RequestItems key={i} {...r}/>
     )
     )}
     <div className='flex justify-center mt-5'>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
          <button
            key={pageNumber}
            className={`px-2 py-1 mr-2 rounded-md text-sm font-medium ${
              currentPage === pageNumber ? 'bg-[#00eaff40] text-black font-extrabold' : 'bg-transparent border border-[#00eaff40]'
            }`}
            onClick={()=>handlePageChange(pageNumber)}
          >
            {pageNumber}
          </button>
        ))}
    </div>
    </div> : <Empty message={'No transaction request has been made, choose an investment plan, make payment, and get started earning'}/>}
    </>
  )
}
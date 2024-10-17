'use client'
import React, { useEffect, useState } from 'react'
import Empty from '@/components/Empty';
import usePagination from '@/hooks/usePagination';
import { db } from '@/firebase';
import { collection, getDocs } from 'firebase/firestore';
import With from './With';


export default function WithCont({setLoading}) {
    const [withdrawals, setWithdrawals] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const withdrawalsSnapshot = await getDocs(collection(db, 'userWithdrawals'));
          let allWithdrawals = [];
    
          withdrawalsSnapshot.forEach((doc) => {
            const userWithdrawals = doc.data().withdrawals || [];
            allWithdrawals = allWithdrawals.concat(userWithdrawals);
          });
          
          allWithdrawals.sort((a, b) => b.date.toDate() - a.date.toDate());
    
          setWithdrawals(allWithdrawals);
          console.log('All withdrawals:', allWithdrawals);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
    
      fetchData();
    }, []);
    
    const { currentPage, slicedData, totalPages, handlePageChange } = usePagination(withdrawals);

  return (
    <>
    {withdrawals?.length>0 ? <div className='grid grid-cols-1 w-full mt-10 gap-2'>
     {slicedData.map((r, i) => (
            <With key={i} {...r} setLoading={setLoading}/>
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
    </div> : <Empty message={'No withdrawal request has been made'}/>}
    </>
  )
}
'use client'
import React, { useEffect, useState } from 'react'
import Empty from '@/components/Empty';
import Req from './Req';
import usePagination from '@/hooks/usePagination';
import { db } from '@/firebase';
import { collection, getDocs } from 'firebase/firestore';


export default function InvestCont({setLoading}) {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const transactionsSnapshot = await getDocs(collection(db, 'userTransactions'));
            let allRequests = [];
        
            transactionsSnapshot.forEach((doc) => {
              const userTransactions = doc.data().requests || [];
              allRequests = allRequests.concat(userTransactions);
            });

            allRequests.sort((a, b) => b.date.toDate() - a.date.toDate());

             setTransactions(allRequests);
            console.log('All requests:', allRequests);
            } catch (error) {
              console.error('Error fetching data:', error);
            }
          };
      
          fetchData();
        }, []);
    const { currentPage, slicedData, totalPages, handlePageChange } = usePagination(transactions);

  return (
    <>
    {transactions?.length>0 ? <div className='grid grid-cols-1 w-full mt-10 gap-2'>
     {slicedData.map((r, i) => (
            <Req  key={i} {...r} setLoading={setLoading}/>
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
    </div> : <Empty message={'No transaction request has been made'}/>}
    </>
  )
}
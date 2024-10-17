'use client'
import React, { useState } from 'react'
import usePagination from '@/hooks/usePagination';
import User from './User';
import Empty from '@/components/Empty';



export default function UsersCont({users}) {
    const { currentPage, slicedData, totalPages, handlePageChange } = usePagination(users);

  return (
    <>
    {users?.length>0 ? <div className='grid grid-cols-1 w-full mt-10 gap-2'>
     {slicedData.map((r, i) => (
            <User key={i} {...r}/>
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
    </div> : <Empty message={'No user has registered yet'}/>}
    </>
  )
}
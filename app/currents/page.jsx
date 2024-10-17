'use client'
import { db } from '@/firebase'
import Currents from '@/components/Currents'
import Sidebar from '@/components/Sidebar'
import Topbar from '@/components/Topbar'
import { AuthContext } from '@/context/AuthContext'
import { doc, onSnapshot } from 'firebase/firestore'
import React, { useContext, useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import Empty from '@/components/Empty'

export default function page() {
  const {currentUser} = useContext(AuthContext) 
  if(!currentUser){ window.location.href = '/login' }
  const [currents, setCurrents] = useState([]); 
 const [filteredData, setFilteredData] = useState([]);
  const [q, setQ] = useState('');

  const handleSearch = (event) => {
    setQ(event.target.value.toLowerCase());
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(db, 'userCurrents', currentUser?.uid),
      (docSnapshot) => {
        if (docSnapshot?.exists) {
          const currentData = docSnapshot?.data()?.currents || [];
          setCurrents(currentData);
        } else {
          console.error("User currents document not found");
        }
      },
      (error) => {
        console.error("Error fetching currents data:", error);
      }
    );
  
    return () => unsubscribe();
  }, [currentUser.uid]);

  useEffect(() => {
    if (currents) {
      const filteredCurrents = currents.filter((current) =>
        current?.plan?.toLowerCase().includes(q)
      );
      setFilteredData(filteredCurrents);
    }
  }, [currents, q]);
  return (
    <div className='flex w-full'>
      <Sidebar title='currents'/>
      <div className='w-full mb-20'>
      <Topbar title={`${currentUser.displayName || ''}/ currents`}/>
      <div className='w-full p-5'>
        <div className='px-5 rounded-lg bg-[#0a0c0c] hover:bg-[#00eaff10] flex items-center gap-5 max-sm:w-full w-[300px] text-[#eee] '>
        <FaSearch/>
          <input type="text" className='outline-none bg-transparent w-full h-[50px]' placeholder='Search by plan' maxLength={20} onChange={handleSearch}/>
        </div>
      </div>
      {currents?.length>0? <div className='w-full p-5 grid max-sm:grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-5'>
      {filteredData.length > 0 ? (
            filteredData.map((current, i) => (
              <Currents key={i} {...current} />
            ))
          ) : (
            <div>No results found.</div>
          )}
      </div> : <Empty message={'No currents added yet'}/>}
      </div>
    </div>
  )
}

import React, { useEffect, useState } from 'react'
import Topbar from './Topbar'
import UsersCont from './UsersCont'
import { db } from '@/firebase';
import { collection, getDocs } from 'firebase/firestore';

export default function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersSnapshot = await getDocs(collection(db, 'users'));
        const usersData = usersSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        usersData.reverse();
        setUsers(usersData);
        console.log('All users:', usersData)
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }, []);

  return (
    <div className='w-full mb-20'>
      <Topbar title='users'/> 
      <div className='flex flex-col p-5 gap-2 max-sm:items-center'>
      <UsersCont users={users}/>
     </div>
</div>
  )
}
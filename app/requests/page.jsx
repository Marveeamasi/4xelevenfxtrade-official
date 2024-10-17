'use client'
import RequestCont from '@/components/RequestCont'
import Sidebar from '@/components/Sidebar'
import Topbar from '@/components/Topbar'
import { AuthContext } from '@/context/AuthContext'
import { useContext } from 'react'

export default function page() {
  const {currentUser} = useContext(AuthContext) 
  if(!currentUser){ window.location.href = '/login' }
  return (
    <div className='flex w-full'>
     <Sidebar title='requests'/>
      <div className='w-full mb-20'>
      <Topbar title={`${currentUser.displayName || ''}/ requests`}/>
      <div className='w-full p-5'>
       <RequestCont/>
      </div>
      </div>
    </div>
  )
}
'use client'
import InvestPlans from '@/components/InvestPlans'
import Sidebar from '@/components/Sidebar'
import Topbar from '@/components/Topbar'
import { AuthContext } from '@/context/AuthContext'
import { useContext } from 'react'

export default function page() {
  const {currentUser} = useContext(AuthContext) 
  if(!currentUser){ window.location.href = '/login' }
  return (
    <div className='flex w-full'>
      <Sidebar title='invest'/>
      <div className='w-full'>
      <Topbar title={`${currentUser.displayName || ''}/ invest`}/>
      <InvestPlans />
      </div>
    </div>
  )
}

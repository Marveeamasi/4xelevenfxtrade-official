import React from 'react'
import Topbar from './Topbar'
import WithCont from './WithCont'

export default function Withdrawals({setLoading}) {
  return (
    <div className='w-full mb-20'>
      <Topbar title='withdrawals'/>
      <div className='flex flex-col p-5 gap-2 max-sm:items-center'>
        <WithCont setLoading={setLoading}/>
     </div>
</div>
  )
}
import React from 'react'

export default function loading() {
  return (
    <div className='flex w-full justify-center items-center z-10 h-screen'>
      <img src="/loader.svg" alt="loading.."/>
    </div>
  )
}

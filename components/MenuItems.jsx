 import React from 'react'

export default function MenuItems({title, Icon, name}) {
  return (
    <a href={name}>
    <div className={`hidden sm:inline text-sm text-[#a2a1ab] hover:text-[#00eaff] `}>
     {title} 
    </div>
    <Icon className={`sm:hidden text-[#a2a1ab] hover:text-[#00eaff] text-[30px] `}/>
    </a>
  )
}

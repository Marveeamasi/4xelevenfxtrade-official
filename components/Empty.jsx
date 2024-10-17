import { MdNoteAlt } from "react-icons/md";

export default function Empty({message}) {
  return (
    <div className='flex p-10 w-full h-full items-center justify-center animate-pulse'>
        <div className='bg-[#00eaff07] rounded-lg p-10 flex max-sm:items-center gap-5 justify-center max-sm:text-center flex-col sm:flex-col-reverse'>
        <MdNoteAlt className="text-5xl"/>
        {message}
        </div>
    </div>
  )
}

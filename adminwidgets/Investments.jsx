import InvestCont from './InvestCont';
import Topbar from './Topbar'

export default function Investments({setLoading}) {

  return (
    <div className='w-full mb-20'>
      <Topbar title='investments'/>
      <div className='flex flex-col p-5 gap-2 max-sm:items-center'>
      <InvestCont setLoading={setLoading}/>
     </div>
</div>
  )
}
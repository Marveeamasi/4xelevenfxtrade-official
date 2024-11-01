'use client';
import axios from 'axios';

export default function page() {

  const handleCallCron = async() => {
          try {
            const res = await axios.get('/api/schedule');
            console.log('successfully sent a get request', res.data);
          } catch (error) {
            console.log('Error sending get request:', error);
            throw error;
          }
  }
  
  return (
    <div className="flex justify-center items-center w-[100vw] h-[100vh]">
      <button onClick={handleCallCron} className="bg-col text-black font-bold rounded-md p-5 hover:opacity-[.75]">
      Schedule Cron
      </button>
    </div>
  )
}
 

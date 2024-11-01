'use client';
import axios from 'axios';

export default const page(){
  
  const handleCallCron = async() => {
        alert('sending get request');
          try {
            const res = await axios.get('/api/schedule');
            alert('successfully sent a get request');
          } catch (error) {
            alert('Error sending get request:', error);
            throw error;
          }
      }
  
  return(
    <div className='flex justify-center items-center'>
     <button className='p-2 bg-col font-bold text-black hover:opacity-[.75]' onClick={handleCallCron}>Run Cron</button>
    </div>
  );
};

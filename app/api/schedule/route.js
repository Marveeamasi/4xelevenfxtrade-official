import scheduleEmails from '@/utils/scheduleEmails';

export async function GET() {
 try{
   await scheduleEmails();
   return new Response('Successfully run schedule', {status: 200});
 } catch (error){
   console.error(error);
   return new Response('Internal server error', {status: 500});
 }
}

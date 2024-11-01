import scheduleEmails from '@/utils/scheduleEmails';

export async function GET(request) {
 try{
 const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('Unauthorized', {
      status: 401,
    });
  }
   await scheduleEmails();
   return new Response('Successfully run schedule', {status: 200});
 } catch (error){
   console.error(error);
   return new Response('Internal server error', {status: 500});
 }
}

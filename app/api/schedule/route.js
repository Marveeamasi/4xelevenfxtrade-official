import scheduleEmails from '@/utils/scheduleEmails';

export async function GET(request) {
 const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${'Vvee120!!!Vvee120!!!'}`) {
    return new Response('Unauthorized', {
      status: 401,
    });
  }
 try{
   await scheduleEmails();
   return new Response('Successfully run schedule', {status: 200});
 } catch (error){
   console.error(error);
   return new Response('Internal server error', {status: 500});
 }
}

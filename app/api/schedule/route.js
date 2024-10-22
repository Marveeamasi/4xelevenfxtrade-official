import { NextResponse } from 'next/server';
import scheduleEmails from '@/utils/scheduleEmails';

export async function GET() {
  try {
    // Call the scheduling function
    await scheduleEmails();

    return NextResponse.json({ message: 'Scheduling emails executed successfully.' }, { status: 200 });
  } catch (error) {
    console.error('Error running scheduling job:', error);
    return NextResponse.json({ message: 'Error running scheduling job.' }, { status: 500 });
  }
}

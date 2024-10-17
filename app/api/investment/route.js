import { NextResponse } from 'next/server';
import scheduleEmails from '@/utils/scheduleEmails';

export async function POST(request) {
  const { initialAmount, createdAtDate, userEmail, plan, userId, username, currentId } = await request.json();

  try {
    // Schedule weekly email updates
    scheduleEmails({
      initialAmount,
      createdAtDate,
      userEmail,
      plan,
      userId,
      username,
      currentId
    });

    return NextResponse.json({ message: 'Investment created and emails scheduled.' }, { status: 200 });
  } catch (error) {
    console.error('Error creating investment:', error);
    return NextResponse.json({ message: 'Error creating investment.' }, { status: 500 });
  }
}

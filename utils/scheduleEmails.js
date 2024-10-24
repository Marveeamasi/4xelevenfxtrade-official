import { db } from '@/firebase';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import nodemailer from 'nodemailer';

// Create transporter for sending emails
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'info@4xeleventrade.store', // your email
    pass: 'bbtp pevz enzn evnr', // your email password or app-specific password
  },
});

// Email sending logic using Nodemailer
async function sendEmail(email, username, profit) {
  const mailOptions = {
    from: 'info@4xeleventrade.store',
    to: email,
    subject: 'Weekly Profit Notification',
    text: `Hi ${username || 'dear'}, you now have $${profit.toFixed(2)} of profit made this week, which has been added to your investment. Visit your dashboard to view your progress. Thank you for using 4Elevenfxtrade. #The sky is your limit!`,
  };
  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${email}`);
  } catch (error) {
    console.error(`Error sending email to ${email}:`, error);
  }
}

// Main function to handle weekly updates
export default async function scheduleEmails() {
  try {
    const userCurrentsDocs = await db.collection('userCurrents').get(); // Fetch all documents in userCurrents collection

    userCurrentsDocs.forEach(async (docSnap) => {
      const { currents } = docSnap.data(); // Extract currents array
      
      // Iterate through each 'current' object for the user
      for (const current of currents) {
        const { email, username, initial, plan } = current;
        let interestRate = 0;
        let totalWeeks = 0;
        let nextPay = current.nextPay || 7;
        let weeks = current.weeks || 0;

        // Set interest rate and duration based on plan type
        switch (plan) {
          case 'student':
            interestRate = 0.10;
            totalWeeks = 2;
            break;
          case 'worker':
            interestRate = 0.12;
            totalWeeks = 4;
            break;
          case 'platinium':
            interestRate = 0.15;
            totalWeeks = 12;
            break;
          case 'retirement':
            interestRate = 0.20;
            totalWeeks = 52;
            break;
          default:
            totalWeeks = 0;
        }

        // Check if the plan duration has completed
        if (weeks >= totalWeeks) {
          console.log(`Plan duration completed for ${email}. No further updates.`);
          continue; // Skip the update if the plan has ended
        }

        // Weekly update logic when the nextPay reaches 0 (time to pay)
        if (nextPay <= 0) {
          const newAmount = parseFloat(initial) * (1 + interestRate);
          const profit = newAmount - parseFloat(initial);
          const updatedWeeks = weeks + 1;

          // Update the 'current' object in the array
          const updatedCurrent = {
            ...current,
            currentAmount: newAmount,
            profit,
            nextPay: 7, // Reset nextPay for the next week
            weeks: updatedWeeks,
            durationElapsed: updatedWeeks === totalWeeks, // Set true when all weeks are completed
          };

          // Update Firestore
          const docRef = doc(db, 'userCurrents', docSnap.id); // Reference to the current user's document
          await updateDoc(docRef, {
            currents: currents.map(c => (c.id === current.id ? updatedCurrent : c)) // Update only the current object
          });

          // Send the weekly email
          await sendEmail(email, username, profit);
          console.log(`Weekly email sent for user ${email}`);
        } else {
          // Decrement nextPay for daily countdown
          const updatedCurrent = {
            ...current,
            nextPay: nextPay - 1
          };

          // Update Firestore
          const docRef = doc(db, 'userCurrents', docSnap.id);
          await updateDoc(docRef, {
            currents: currents.map(c => (c.id === current.id ? updatedCurrent : c))
          });

          console.log(`Next pay day updated: ${nextPay - 1} days remaining for ${email}`);
        }
      }
    });
  } catch (error) {
    console.error('Error running scheduleEmails:', error);
  }
}

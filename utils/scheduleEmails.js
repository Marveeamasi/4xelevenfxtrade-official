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
    text: `Hi ${username || 'dear'}, you now have $${profit.toFixed(2)} of profit made this week which has been added to investment. Visit your dashboard to view your progress. Thank you for using 4Elevenfxtrade. #The sky is your limit!`,
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
    const userCurrentsDocs = await db.collection('userCurrents').get();

    userCurrentsDocs.forEach(async (doc) => {
      const { currents } = doc.data();
      
      for (const current of currents) {
        let { email, username, initial, nextPay, weeks, plan } = current;
        let interestRate = 0;
        let totalWeeks = 0;

        // Calculate interest rate and total weeks based on the plan
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

        // Check if the plan duration has elapsed
        if (weeks >= totalWeeks) {
          console.log(`Plan duration completed for ${email}. No further updates.`);
          continue; // Skip this current object since its duration has elapsed
        }

        // Weekly update logic (similar to your previous interval logic)
        if (nextPay <= 0) {
          let newAmount = parseFloat(initial) * (1 + interestRate);
          let profit = newAmount - parseFloat(initial);
          let updatedWeeks = weeks + 1;

          // Update current data
          await updateDoc(doc.ref, {
            ...current,
            currentAmount: newAmount,
            profit: profit,
            nextPay: 7, // Reset for the next week
            weeks: updatedWeeks,
            durationElapsed: updatedWeeks === totalWeeks // Mark as true when total weeks are completed
          });

          // Send email
          await sendEmail(email, username, profit);
          console.log(`Weekly email sent for user ${email}`);
        } else {
          // Just decrement nextPay for daily countdown
          await updateDoc(doc.ref, {
            ...current,
            nextPay: nextPay - 1
          });
          console.log(`Next pay day updated: ${nextPay - 1} days remaining for ${email}`);
        }
      }
    });
  } catch (error) {
    console.error('Error running scheduleEmails:', error);
  }
      }
                             

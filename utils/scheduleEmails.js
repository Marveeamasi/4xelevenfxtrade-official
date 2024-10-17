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
async function sendEmail(userEmail, username, profit) {
  const mailOptions = {
    from: 'info@4xeleventrade.store',
    to: userEmail,
    subject: 'Weekly Profit Notification',
    text: `Hi ${username || 'dear'}, you now have $${profit.toFixed(2)} of profit made this week which has been added to investment. Visit your dashboard to view your progress. Thank you for using 4Elevenfxtrade. #The sky is your limit!`,
  };
   try {
    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${userEmail}`);
  } catch (error) {
    console.error(`Error sending email to ${userEmail}:`, error);
  }
}

// Schedule the emails and updates
export default function scheduleEmails({ userEmail, plan, userId, currentId, username }) {
  let weeks = 0;
  let totalWeeks = 0;
  let interestRate = 0;
  let daysRemaining = 7; // Start with 7 days for the first interest payment
  let specCurrent = {};

  // Set totalWeeks and interestRate based on plan
  switch (plan) {
    case 'student':
      totalWeeks = 2;
      interestRate = 0.10;
      break;
    case 'worker':
      totalWeeks = 4;
      interestRate = 0.12;
      break;
    case 'platinium':
      totalWeeks = 12;
      interestRate = 0.15;
      break;
    case 'retirement':
      totalWeeks = 52;
      interestRate = 0.20;
      break;
    default:
      totalWeeks = 0;
  }

  // Fetch current object
  const getCurrent = async () => {
    try {
      const userCurrentsDoc = await getDoc(doc(db, 'userCurrents', userId));
      if (userCurrentsDoc.exists()) {
        const currents = userCurrentsDoc.data().currents || [];
        specCurrent = currents.find((c) => c.id === currentId);
        if (!specCurrent) {
          console.error(`Current with ID ${currentId} not found. Skipping update for this current.`);
          return null;  // Return null to indicate that no current was found
        }
        return { currents, specCurrent };
      } else {
        console.error('User currents not found');
        return null;
      }
    } catch (error) {
      console.error('Error fetching currents:', error);
      return null;
    }
  };

  // Update current object in the currents array
  const updateCurrent = async (updatedCurrent) => {
    try {
      const { currents } = await getCurrent();
      const updatedCurrents = currents.map((c) => (c.id === currentId ? updatedCurrent : c));
      await updateDoc(doc(db, 'userCurrents', userId), { currents: updatedCurrents });
      console.log(`Current updated for user: ${userId}`);
    } catch (error) {
      console.error(`Error updating current for user ${userId}:`, error);
    }
  };

  const dailyIntervalId = setInterval(async () => {
    try {
      await getCurrent();
      if (daysRemaining <= 0) {
        daysRemaining = 7;  // Reset after each payment

        // Weekly update (every 7 days)
        weeks++;
        const newAmount = parseFloat(specCurrent?.initial) * (1 + interestRate * weeks);
        const profit = newAmount - parseFloat(specCurrent?.initial);

        // Update `newAmount`, `profit`, and `nextPay`
        await updateCurrent({
          ...specCurrent,
          currentAmount: newAmount,
          profit: profit,
          nextPay: daysRemaining, // Reset nextPay to 7
          durationElapsed: weeks >= totalWeeks, // Mark plan completion if total weeks are reached
        });

        // Send weekly email
        await sendEmail(userEmail, username, profit);
        console.log(`Weekly update: Amount ${newAmount}, Profit ${profit}`);

        // Stop the interval if plan duration is complete
        if (weeks >= totalWeeks) {
          clearInterval(dailyIntervalId);
          console.log('Plan duration complete, interval cleared.');
          return;
        }
      } else {
        // Daily update for `nextPay`
        daysRemaining--;
        await updateCurrent({ ...specCurrent, nextPay: daysRemaining });
        console.log(`Next pay day updated: ${daysRemaining} days remaining`);
      }
    } catch (error) {
      console.error('Error updating next pay or weekly values:', error);
    }
  },24 * 60 * 60 * 1000); // one day
}

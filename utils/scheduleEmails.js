import { db } from '@/firebase';
import { doc, updateDoc, collection, getDocs } from 'firebase/firestore';
import nodemailer from 'nodemailer';

// Create transporter for sending emails
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth:{
    user: '4xelevenfxtrade@gmail.com',
    pass: 'dqtg isjh yjdo fdyi',
  },
});

// Email sending logic using Nodemailer
async function sendEmail(email, username, profit) {
  const mailOptions = {
    from: '4xelevenfxtrade@gmail.com',
    to: email,
    subject: '4Elevenfxtrade: Weekly Profit Notification',
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
    const userCurrentsDocs = await getDocs(collection(db, 'userCurrents'));

    // Iterate through each document in userCurrents collection
    for (const docSnap of userCurrentsDocs.docs) {
      const { currents } = docSnap.data();

      if (!Array.isArray(currents) || currents.length === 0) {
        console.log(`No 'currents' array found or it's empty for document ID: ${docSnap.id}`);
        continue;
      }

      // Iterate through each 'current' object for the user
      for (const current of currents) {
        const { email, username, initial, plan, id } = current;
        let interestRate = 0;
        let totalWeeks = 0;
        let nextPay = current?.nextPay ?? 7;
        let weeks = current?.weeks ?? 0;
        let profitCount = current?.profitCount ?? 0;

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

        if (weeks >= totalWeeks) {
          console.log(`Plan duration completed for ${email}. No further updates.`);
          continue;
        }

        // Weekly update logic when nextPay is 0
        if (nextPay <= 0) {
          console.log('its a week now');
         if(profitCount === 0){
          console.log('its first weekly update');
          const newAmount = parseFloat(initial) * (1.0 + interestRate);
          const profit = newAmount - parseFloat(initial);
          const updatedWeeks = weeks + 1;

          // Update the 'current' object in the array
          const updatedCurrent = {
            ...current,
            currentAmount: newAmount,
            profit,
            nextPay: 7, // Reset nextPay for the next week
            weeks: updatedWeeks,
            durationElapsed: updatedWeeks === totalWeeks,
            profitCount: 1.0
          };

          const docRef = doc(db, 'userCurrents', docSnap.id);
          await updateDoc(docRef, {
            currents: currents.map(c => (c.id === id ? updatedCurrent : c)),
          });

          await sendEmail(email, username, profit);
          console.log(`Weekly email sent for user ${email}`);
         }else{
          console.log('its not first weekly update');
          profitCount = profitCount + 0.1;
          const newAmount = parseFloat(initial) * (profitCount + interestRate);
          const profit = newAmount - parseFloat(initial);
          const updatedWeeks = weeks + 1;

          // Update the 'current' object in the array
          const updatedCurrent = {
            ...current,
            currentAmount: newAmount,
            profit,
            nextPay: 7, // Reset nextPay for the next week
            weeks: updatedWeeks,
            durationElapsed: updatedWeeks === totalWeeks,
            profitCount
          };

          const docRef = doc(db, 'userCurrents', docSnap.id);
          await updateDoc(docRef, {
            currents: currents.map(c => (c.id === id ? updatedCurrent : c)),
          });

          await sendEmail(email, username, profit);
          console.log(`Weekly email sent for user ${email}`);
         }
        } else {
          // Decrement nextPay
          const updatedCurrent = {
            ...current,
            nextPay: nextPay - 1,
          };

          const docRef = doc(db, 'userCurrents', docSnap.id);
          await updateDoc(docRef, {
            currents: currents.map(c => (c.id === id ? updatedCurrent : c)),
          });

          console.log(`Next pay day updated: ${nextPay - 1} days remaining for ${email}`);
        }
      }
    }
  } catch (error) {
    console.error('Error running scheduleEmails:', error);
  }
}

               

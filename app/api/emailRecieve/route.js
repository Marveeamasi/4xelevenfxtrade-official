import nodemailer from 'nodemailer';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { to_email, subject, message } = req.body;

    if (!to_email || !subject || !message) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        // Create a transporter
        const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth:{
    user: '4xelevenfxtrade@gmail.com',
    pass: 'dqtg isjh yjdo fdyi',
  },
});


        // Email options
        const mailOptions = {
            from: to_email, // Sender address
            to: '4xelevenfxtrade@gmail.com', // List of receivers
            subject: subject, // Subject line
            text: message, // Plain text body
        };

        // Send email
        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Error sending email', error });
    }
              }
          

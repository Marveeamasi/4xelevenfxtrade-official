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
            host: 'smtp.gmail.com', // Use your email provider's SMTP server
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.EMAIL_USER, // Your email
                pass: process.env.EMAIL_PASS, // Your email password or app password
            },
        });

        // Email options
        const mailOptions = {
            from: '"4Elevenfxtrade" <your-email@gmail.com>', // Sender address
            to: to_email, // List of receivers
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
          

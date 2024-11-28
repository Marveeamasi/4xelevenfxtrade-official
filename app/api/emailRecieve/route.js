import nodemailer from 'nodemailer';

export async function POST(req) {
    try {
        const body = await req.json(); // Parse JSON body
        const { to_email, subject, message } = body;

        if (!to_email || !subject || !message) {
            return new Response(
                JSON.stringify({ message: 'Missing required fields' }),
                { status: 400 }
            );
        }

        // Create a transporter
        const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth:{
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});


        const mailOptions = {
            from: '4xelevenfxtrade@gmail.com',
            to: '4xelevenfxtrade@gmail.com',
            subject: subject,
            text: message,
        };

        await transporter.sendMail(mailOptions);

        return new Response(
            JSON.stringify({ message: 'Email sent successfully' }),
            { status: 200 }
        );
    } catch (error) {
        console.error('Error sending email:', error);
        return new Response(
            JSON.stringify({ message: 'Error sending email', error }),
            { status: 500 }
        );
    }
}

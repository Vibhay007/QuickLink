import nodemailer from 'nodemailer';

const sendEmail = async ({ to, subject, html }) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: `"QuickLink" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });
    console.log('✅ Email sent to:', to);
  } catch (error) {
    console.error('❌ Email sending failed:', error.message); // ← this will show in Render logs
    throw error; // re-throw so frontend gets 500 error
  }
};

export default sendEmail;
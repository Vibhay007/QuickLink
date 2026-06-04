import { Resend } from 'resend';

const sendEmail = async ({ to, subject, html }) => {
  const resend = new Resend(process.env.RESEND_API_KEY); // ✅ moved inside

  try {
    await resend.emails.send({
      from: 'QuickLink <onboarding@resend.dev>',
      to,
      subject,
      html,
    });
    console.log('✅ Email sent to:', to);
  } catch (error) {
    console.error('❌ Email sending failed:', error.message);
    throw error;
  }
};

export default sendEmail;
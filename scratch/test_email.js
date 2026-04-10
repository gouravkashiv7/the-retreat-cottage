const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT) || 465,
  secure: process.env.EMAIL_PORT == 465,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

console.log('Testing connection to:', process.env.EMAIL_HOST, 'on port:', process.env.EMAIL_PORT);

transporter.verify(function (error, success) {
  if (error) {
    console.error('❌ Connection failed:', error);
  } else {
    console.log('✅ Server is ready to take our messages');
    
    const mailOptions = {
      from: `"Test" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: 'Test Email from TRC',
      text: 'This is a test email to verify SMTP configuration.',
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error('❌ Send failed:', err);
      } else {
        console.log('✅ Email sent:', info.response);
      }
      process.exit(0);
    });
  }
});

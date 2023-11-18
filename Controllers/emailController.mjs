import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const EMAIL = process.env.EMAIL;
const PASSWORD = process.env.PASSWORD;
// Create a transporter for sending emails 
const transporter = nodemailer.createTransport({
  service: 'hotmail',
  auth: {
    user: EMAIL,
    pass: PASSWORD,
  },
});

// Send an email with a verification link
export const sendPasswordResetEmail = {
    send: async (email, token, username) => {
        const mailOptions = {
        from: EMAIL,
        to: email,
        subject: 'Password Reset',  
        text: `Hi ${username}! \n
        You are receiving this because you (or someone else) has requested the rest of the password for your account.\n
        Please click on the following link to reset your password: http://localhost:3000/reset-password?token=${token}\n
        If you did not request this, please ignore this email and your password will remain unchanged.\n`
    };
    try {
        await transporter.sendMail(mailOptions);
        console.log(`Password reset email sent to ${email}`);
    } catch (err) {
        console.error('Error sending password reset email: ', err);
        throw new Error('Error sending password reset email');
    }
    }
};

export const sendConfirmationEmail = {
  send: async (email, verificationCode, username) => {
    const mailOptions = {
      from: EMAIL,
      to: email,
      subject: 'Email Confirmation',
      text: `Hi ${username}! \n
      You are receiving this because you (or someone else) has requested the confirmation of your email for your account.\n\n
      Please click on the following link to confirm your email: ${verificationCode}\n\n
      or click this link http://localhost:3000/verificationcode?code=${verificationCode}\n
      If you did not request this, please ignore this email and your email will remain unchanged.\n`
    };
    try {
      await transporter.sendMail(mailOptions);
      console.log(`Email confirmation email sent to ${email}`);
    } catch (err) {
      console.error('Error sending email confirmation email: ', err);
      throw new Error('Error sending email confirmation email');
    }
  }
};
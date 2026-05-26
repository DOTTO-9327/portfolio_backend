import nodemailer from 'nodemailer';

 
export const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS, // mot de passe d'application Google
  },
});
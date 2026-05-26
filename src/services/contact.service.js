import { transporter } from "../config/email.js";

export const sendContactEmail = async ({ name, email, message }) => {
  return transporter.sendMail({
    from: process.env.MAIL_USER,
    to: process.env.MAIL_TO,
    subject: `Contact portfolio de ${name}`,
    text: `Message de ${name} (${email}) : ${message}`
  });
};
import * as ContactService from "../services/contact.service.js";

export const sendContact = async (req, res) => {
  const { name, email, message } = req.body;
  await ContactService.sendContactEmail({ name, email, message });
  res.status(200).json({ message: "Email envoyé avec succès" });
};
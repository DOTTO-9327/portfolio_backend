import * as authService from '../services/auth.service.js';

// Dans src/controllers/auth.controller.js, écrire login(req, res, next) qui :
export const login = async (req, res, next) => {

    // Extraction des identifiants
  const { email, password } = req.body; // ✅

  // Appelle authService.loginUser(...) => envoyer directement req.body, Appel du service (on attend le token)
  const token = await authService.loginUser({ email, password }); // ✅

  // Renvoie res.json({ token }) en cas de succès,Réponse en cas de succès
  return res.status(200).json({ token }); // ✅ oublies pas le status
}


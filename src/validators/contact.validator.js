import { body } from 'express-validator';

export const validateContact = [
  // Name : Obligatoire, chaîne, entre 2 et 100 caractères
  body('name')
    .trim()
    .notEmpty().withMessage('Le nom est requis')
    .isString().withMessage('Le nom doit être une chaîne de caractères')
    .isLength({ min: 2, max: 100 }).withMessage('Le nom doit contenir entre 2 et 100 caractères'),

  // Email : Obligatoire, format email valide
  body('email')
    .trim()
    .notEmpty().withMessage('L\'email est requis')
    .isEmail().withMessage('Format d\'email invalide')
    .normalizeEmail(), // Optionnel : met l'email en minuscules et nettoie les espaces

  // Message : Obligatoire, chaîne, entre 10 et 2000 caractères
  body('message')
    .trim()
    .notEmpty().withMessage('Le message est requis')
    .isString().withMessage('Le message doit être une chaîne de caractères')
    .isLength({ min: 10, max: 2000 }).withMessage('Le message doit contenir entre 10 et 2000 caractères'),
];
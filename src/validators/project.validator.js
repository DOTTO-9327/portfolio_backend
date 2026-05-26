import { body, param } from 'express-validator';

export const validateProject = [
  // Title : Obligatoire, chaîne, entre 2 et 150 caractères
  body('title')
    .notEmpty().withMessage('Le titre est obligatoire')
    .isString().withMessage('Le titre doit être une chaîne de caractères')
    .isLength({ min: 2, max: 150 }).withMessage('Le titre doit contenir entre 2 et 150 caractères'),

  // Description : Optionnelle, chaîne, max 2000
  body('description')
    .optional()
    .isString().withMessage('La description doit être une chaîne de caractères')
    .isLength({ max: 2000 }).withMessage('La description ne peut pas dépasser 2000 caractères'),

  // Tech Stack : Optionnelle, chaîne, max 255
  body('tech_stack')
    .optional()
    .isString().withMessage('La tech stack doit être une chaîne de caractères')
    .isLength({ max: 255 }).withMessage('La tech stack ne peut pas dépasser 255 caractères'),

  // GitHub URL : Optionnelle, format URL
  body('github_url')
    .optional()
    .isURL().withMessage('L\'URL GitHub doit être valide'),

  // Demo URL : Optionnelle, format URL
  body('demo_url')
    .optional()
    .isURL().withMessage('L\'URL de démo doit être valide'),

  // Image URL : Optionnelle, format URL
  body('image_url')
    .optional()
    .isURL().withMessage('L\'URL de l\'image doit être valide'),
];

// validate ID 
export const validateId = [
  param('id')
    .notEmpty().withMessage("L'id est obligatoire")
    .isInt({ min: 1 }).withMessage("L'id doit être un entier positif"),
];
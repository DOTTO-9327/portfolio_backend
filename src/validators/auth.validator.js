
import { body } from 'express-validator';
 
export const validateAuth = [ // tableau qui énonce toutes les règles de validation pour ces champs 
  body('email').notEmpty().withMessage('Le champ email est requis').isEmail().withMessage('Email invalide'),
  body('password').notEmpty().withMessage('Mot de passe requis'),
];

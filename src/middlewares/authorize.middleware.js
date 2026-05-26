
//function
// on ne peut pas ajouter des paramètres divers dans un middlewere. le pourquoi on l'englobe avec une fonction qui, lui va recupérer le rôle. ainsi comme le middlwere est a l'intérieur de la fonction, il va pouvoir utilisé le rôle. 
export const authorize = (...roles) => {
  return (req, res, next) => {

    // 1. On vérifie si req.user existe (injecté par le middleware authenticate)
    // 2. On vérifie si le rôle de l'utilisateur est inclus dans les rôles permis

    if (!req.user || !roles.includes(req.user.role)) {
      throw new AppError('Accès interdit : vous n\'avez pas les permissions nécessaires', 403); 
    }

    // Si tout est OK, on passe au middleware suivant ou au contrôleur
    next();
  };
};

// Flexibilité : Grâce à l'opérateur spread (...roles), tu peux passer un seul rôle authorize('admin') ou plusieurs authorize('admin', 'manager').

// Sémantique HTTP : * Le middleware authenticate (que tu dois appeler avant) renvoie une 401 (Unauthorized) si on ne sait pas qui est l'utilisateur.

//     Ce middleware authorize renvoie une 403 (Forbidden) : on sait qui tu es, mais tu n'as pas le droit d'être ici. C'est une distinction subtile mais capitale pour le debug et la sécurité.

// Compatibilité Express 5 : Le throw error à l'intérieur du middleware est automatiquement intercepté s'il est synchrone. Si ton middleware était asynchrone (par exemple s'il devait vérifier une permission en base de données), Express 5 l'attraperait aussi sans sourciller.
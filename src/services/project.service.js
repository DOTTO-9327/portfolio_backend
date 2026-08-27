import * as projectModel from "../models/project.model.js";
import AppError from "../errors/AppError.js";

export const getAllProjects = async () => {
  return await projectModel.findAll();
};


//Récupérer un projet par son id
export const getProjectById = async (id) => {
  const project = await projectModel.findById(id);

  if (!project) {
    throw new AppError('Projet introuvable', 404);
  }

  return project;
};


// créer un projet
export const createProject = async (userId, projectData) => {
  // Ici, on pourrait ajouter une logique métier (ex: vérifier si le titre existe déjà)
  return await projectModel.create(userId, projectData);
};

// Modifier un projet 
// C'est ici qu'on vérifie que tout est logique avant de toucher à la base.
// "Le service contient la logique métier. Par exemple, ici, il vérifie si le projet existe avant d'essayer de le modifier. Cela permet de séparer la gestion de la base de données (Model) et la gestion de la réponse HTTP (Controller). C'est plus propre et plus facile à tester."
export const updateProject = async (id, data) => {
  // 1. Avant de modifier, on vérifie si le projet existe vraiment.
  // On ne peut pas changer les pneus d'une voiture qui n'existe pas !
  const existingProject = await projectModel.findById(id);

  // 2. Si on ne trouve rien, on lance une alerte (Erreur 404)
  // Cela arrête tout et dit au serveur : "Dis au client que c'est introuvable"
  if (!existingProject) {
    throw new AppError('Projet introuvable', 404);
  }

  // 3. Si le projet existe, on demande au Model de faire les changements
  const updatedProject = await projectModel.update(id, data);

  // 4. On redonne le projet modifié au contrôleur
  return updatedProject;
};



// supprimer un projet 
export const deleteProject = async (id) => {
  // 1. On demande au model de supprimer le projet
  const isDeleted = await projectModel.remove(id);

  // 2. Si le model nous répond 'false', c'est que l'ID n'existait pas en base.
  // On lance alors une erreur 404 "Projet introuvable".
  if (!isDeleted) {
    throw new AppError('Projet introuvable', 404);
  }

  // 3. Si c'est 'true', tout est OK, on s'arrête là (pas besoin de retourner de données)
  return true;
};
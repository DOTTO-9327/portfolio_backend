import * as projectService from "../services/project.service.js";

export const getAllProjects = async (req, res) => {
  const projects = await projectService.getAllProjects();
  res.status(200).json(projects);
};

//Récupérer un projet par son id

export const getProjectById = async (req, res) => {
  const { id } = req.params;
  const project = await projectService.getProjectById(id);
  
  res.status(200).json(project);
};

// créer un projet 
export const createProject = async (req, res) => {
  // On passe tout le corps de la requête au service
  const newProject = await projectService.createProject(req.body);
  
  res.status(201).json(newProject);
};

// Modifier un projet 
// Le réceptionniste 
export const updateProject = async (req, res) => {
  // 1. On récupère l'ID qui est dans l'adresse URL (ex: /api/projects/5)
  const { id } = req.params;

  // 2. On récupère les nouvelles infos envoyées dans le corps de la requête (le JSON)
  const data = req.body;

  // 3. On demande au service de faire son travail avec ces deux infos
  const project = await projectService.updateProject(id, data);
  
  // 4. On répond au client (Postman ou ton site React) avec le projet modifié en JSON
  res.status(200).json(project);
};



// supprimer un projet 
export const deleteProject = async (req, res) => {
  // 1. On récupère l'ID dans l'URL
  const { id } = req.params;

  // 2. On appelle le service pour faire la suppression
  await projectService.deleteProject(id);
  
  // 3. On envoie le code HTTP 204 "No Content" (Pas de contenu)
  // C'est la façon polie de dire : "C'est fait, et comme c'est supprimé, il n'y a plus rien à voir !"
  res.status(204).send();
};

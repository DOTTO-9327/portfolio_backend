import { Router } from "express";
import * as projectController from "../controllers/project.controller.js";
import { validateId, validateProject } from "../validators/project.validator.js";
import validate from "../middlewares/validate.middleware.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/authorize.middleware.js";

const router = Router();

// GET /api/projects
router.get("/", projectController.getAllProjects);
router.get("/:id", validateId,validate,projectController.getProjectById);
router.post("/", authenticate, authorize('admin'), validateProject, validate, projectController.createProject);
// PUT est une méthode HTTP utilisée pour mettre à jour (remplacer) une ressource existante par de nouvelles données.
router.put("/:id", authenticate, authorize('admin'), validateId, validateProject, validate, projectController.updateProject); 
router.delete(
  "/:id",                 // DELETE /api/projects/5
  authenticate,           // "Es-tu connecté ?"
  authorize('admin'),     // "Es-tu l'admin ? (Seul l'admin peut supprimer)"
  validateId,             // "L'ID est-il bien un nombre ?"
  validate, // "Si l'ID est 'abc', on s'arrête là."
  projectController.deleteProject // "OK, tu peux supprimer."
); 

export default router;


import { Router } from "express";
import * as ContactController from "../controllers/contact.controller.js";
import { validateContact } from "../validators/contact.validator.js";
import validate from "../middlewares/validate.middleware.js";

const router = Router();

router.post("/", validateContact, validate, ContactController.sendContact);

export default router;
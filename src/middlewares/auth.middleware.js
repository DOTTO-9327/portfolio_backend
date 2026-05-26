// src/middlewares/auth.middleware.js

import jwt from "jsonwebtoken";
import AppError from "../errors/AppError.js";

export const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Vérifie si le header Authorization existe et commence par Bearer
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new AppError("Token manquant", 401));
  }

  const token = authHeader.split(" ")[1];

  try {
    // Vérifie le token
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    // Stocke le payload dans req.user
    req.user = payload;

    next();
  } catch (err) {
    return next(new AppError("Token invalide", 401));
  }
};
import { body, param } from "express-validator";

/* =====================
   POSTS
===================== */

export const createPostValidator = [
  body("title")
    .notEmpty().withMessage("El título es obligatorio")
    .isLength({ min: 3 }).withMessage("El título debe tener al menos 3 caracteres"),

  body("category")
    .notEmpty().withMessage("La categoría es obligatoria")
    .isLength({ min: 3 }).withMessage("La categoría debe tener al menos 3 caracteres"),

  body("content")
    .notEmpty().withMessage("El contenido es obligatorio")
    .isLength({ min: 10 }).withMessage("El contenido debe tener al menos 10 caracteres"),
];

export const updatePostValidator = [
  param("id")
    .isMongoId().withMessage("ID de post inválido"),

  body("title")
    .optional()
    .isLength({ min: 3 }).withMessage("El título debe tener al menos 3 caracteres"),

  body("category")
    .optional()
    .isLength({ min: 3 }).withMessage("La categoría debe tener al menos 3 caracteres"),

  body("content")
    .optional()
    .isLength({ min: 10 }).withMessage("El contenido debe tener al menos 10 caracteres"),
];

/* =====================
   COMMENTS
===================== */

export const createCommentValidator = [
  body("content")
    .notEmpty().withMessage("El comentario es obligatorio")
    .isLength({ min: 3 }).withMessage("El comentario debe tener al menos 3 caracteres"),

  body("postId")
    .notEmpty().withMessage("El postId es obligatorio")
    .isMongoId().withMessage("ID de post inválido"),
];

export const updateCommentValidator = [
  param("id")
    .isMongoId().withMessage("ID de comentario inválido"),

  body("content")
    .optional()
    .isLength({ min: 3 }).withMessage("El comentario debe tener al menos 3 caracteres"),
];
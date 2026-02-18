import { body } from "express-validator";

export const registerValidator = [
  body("username").notEmpty(),
  body("email").isEmail(),
  body("password").isLength({ min: 6 }),
];

export const postValidator = [
  body("title").notEmpty(),
  body("category").notEmpty(),
  body("content").notEmpty(),
];

export const commentValidator = [
  body("text").notEmpty(),
];

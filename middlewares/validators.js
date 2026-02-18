import { body } from "express-validator";


export const postValidator = [
  body("title").notEmpty(),
  body("category").notEmpty(),
  body("content").notEmpty(),
];

export const commentValidator = [
  body("text").notEmpty(),
];

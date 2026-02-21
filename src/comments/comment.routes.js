import { Router } from "express";

import {
  createComment,
  updateComment,
  deleteComment,
} from "./comment.controller.js";

import { validateJWT } from "../../middlewares/validate-jwt.js";
import { validateFields } from "../../middlewares/validate-fields.js";

import {
  createCommentValidator,
  updateCommentValidator,
} from "../../middlewares/validators.js";

const router = Router();

router.post(
  "/",
  validateJWT,
  createCommentValidator,
  validateFields,
  createComment
);

router.put(
  "/:id",
  validateJWT,
  updateCommentValidator,
  validateFields,
  updateComment
);

router.delete("/:id", validateJWT, deleteComment);

export default router;
import { Router } from "express";
import {
  createPost,
  getPosts,
  deletePost,
  updatePost,
} from "./post.controller.js";

import { validateJWT } from "../../middlewares/validate-jwt.js";
import { validateFields } from "../../middlewares/validate-fields.js";

import {
  createPostValidator,
  updatePostValidator,
} from "../../middlewares/validators.js";

const router = Router();

router.get("/", getPosts);

router.post(
  "/",
  validateJWT,
  createPostValidator,
  validateFields,
  createPost
);

router.put(
  "/:id",
  validateJWT,
  updatePostValidator,
  validateFields,
  updatePost
);

router.delete("/:id", validateJWT, deletePost);

export default router;
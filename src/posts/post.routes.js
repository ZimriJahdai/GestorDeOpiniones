import { Router } from "express";

import {
  createPost,
  getPosts,
  deletePost,
  updatePost,
} from "./post.controller.js";

import { validateJWT } from "../../middlewares/validate-jwt.js";

const router = Router();

router.get("/", getPosts);

router.post("/", validateJWT, createPost);

router.put("/:id", validateJWT, updatePost);

router.delete("/:id", validateJWT, deletePost);

export default router;

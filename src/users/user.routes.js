import { Router } from "express";

import {
  register,
  login,
  profile,
  updateProfile,
  changePassword,
} from "./user.controller.js";

import { validateJWT } from "../../middlewares/validate-jwt.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);

router.get("/profile", validateJWT, profile);

router.put("/profile", validateJWT, updateProfile);

router.put("/password", validateJWT, changePassword);

export default router;

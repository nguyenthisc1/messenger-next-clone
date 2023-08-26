import { Router } from "express";
import {
  getProfileAction,
  loginAction,
  registerAction,
} from "../controllers/AuthController.js";
import verifyToken from "../middlewares/VerifyToken.js";
const router = Router();

router.post("/login", loginAction);
router.post("/register", registerAction);
router.get("/profile", verifyToken, getProfileAction);

export default router;

import { Router } from "express";
import {
  getProfileAction,
  loginAction,
  pusherAuthChannel,
  registerAction,
  updateProfileAction,
} from "../controllers/AuthController.js";
import verifyToken from "../middlewares/VerifyToken.js";
const router = Router();

router.post("/login", loginAction);
router.post("/register", registerAction);
router.get("/profile", verifyToken, getProfileAction);
router.patch("/update", verifyToken, updateProfileAction)
router.post("/pusher", pusherAuthChannel)

export default router;

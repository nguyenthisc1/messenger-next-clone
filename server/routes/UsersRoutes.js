import { Router } from "express";
import { getUsersAction } from "../controllers/UserController.js";
import verifyToken from "../middlewares/VerifyToken.js";

const router = Router();

router.get("/list", verifyToken, getUsersAction);

export default router;

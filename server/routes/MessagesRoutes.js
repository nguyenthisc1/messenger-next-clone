import { Router } from "express";

import verifyToken from "../middlewares/VerifyToken.js";
import { getMessagesAction } from "../controllers/MessagesController.js";
const router = Router();

router.get("/messages/:id", verifyToken, getMessagesAction);

export default router;

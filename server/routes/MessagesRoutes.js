import { Router } from "express";

import verifyToken from "../middlewares/VerifyToken.js";
import { getMessagesAction, postMessagesAction } from "../controllers/MessagesController.js";
const router = Router();

router.get("/:id", verifyToken, getMessagesAction);
router.post("/post", verifyToken, postMessagesAction)

export default router;

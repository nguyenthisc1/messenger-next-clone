import { Router } from "express";
import { getConversation, getConversations } from "../controllers/ConversationsController.js";
import verifyToken from "../middlewares/VerifyToken.js";
const router = Router();

router.post("/conversation", verifyToken, getConversation);
router.get("/conversations", verifyToken, getConversations);

export default router
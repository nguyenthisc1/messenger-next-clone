import { Router } from "express";
import {
  createOrGetConversationAction,
  getConversationByIdAction,
  getConversationsAction,
} from "../controllers/ConversationsController.js";
import verifyToken from "../middlewares/VerifyToken.js";
const router = Router();

router.post("/conversation/create", verifyToken, createOrGetConversationAction);
router.get("/conversations", verifyToken, getConversationsAction);
router.get("/conversation/:id", verifyToken, getConversationByIdAction);
export default router;

import { Router } from "express";
import {
  createOrGetConversationAction,
  deleteConversationAction,
  getConversationByIdAction,
  getConversationsAction,
  seenConversationAction,
} from "../controllers/ConversationsController.js";
import verifyToken from "../middlewares/VerifyToken.js";
const router = Router();

router.post("/create", verifyToken, createOrGetConversationAction);
router.delete("/delete/:id", verifyToken, deleteConversationAction)
router.get("/", verifyToken, getConversationsAction);
router.get("/:id", verifyToken, getConversationByIdAction);
router.get("/:id/seen", verifyToken, seenConversationAction)

export default router;

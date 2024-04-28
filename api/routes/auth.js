import { Router } from "express";
import authController from "../controller/authController.js";
const router = Router();

router.route("/").get(authController.getAllUser);
router.route("/normal").post(authController.authUser);
router.route("/emoji").post(authController.emojiUser);
router.route("/normal-attempt").put(authController.updateNormalAttempt);
router.route("/emoji-attempt").put(authController.updateEmojiAttempt);

export default router;

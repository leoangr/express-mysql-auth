import express from "express";
import { login, logout, signup, user } from "../controllers/auth.controller.js";
import { verifyToken } from "../middleware/verify.token.js";

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);
router.get("/check-me", verifyToken, (req, res) => {
  res.status(200).json({
    status: true,
    userId: req.userId
  });
});

router.post('/user', verifyToken, user);

export default router
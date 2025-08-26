import expres from "express";
import {
  login,
  logout,
  forgetPassword,
  signup,
  verifyEmail,
  resetPassword,
  checkAuth,
} from "../controler/auth.controler.js";
import { verifyToken } from "../middelware/verifyToken.js";

const router = expres.Router();

router.get("/check-auth",verifyToken,checkAuth)
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/verify_email", verifyEmail);
router.post("/forget_password", forgetPassword)
router.post("/reset_password/:token", resetPassword)

export default router;

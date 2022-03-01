const express = require("express");
const router = express.Router();
const { register, activateAccount, login, renewAccessToken, forgotPassword, resetPassword, logout } = require("../controllers/authControllers");
const { verifyAccessToken } = require("../middlewares/index");

// Routes beginning with /api/auth
router.post("/register", register);
router.post("/activate-account", activateAccount);
router.post("/login", login);
router.post("/renew-access-token", renewAccessToken);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", verifyAccessToken, resetPassword);
router.get("/logout", logout);

module.exports = router;

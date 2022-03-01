const express = require("express");
const router = express.Router();
const { getUsers, getUserById } = require("../controllers/userControllers");
const { verifyAccessToken, verifyAdmin } = require("../middlewares");

// Routes beginning with /api/users
router.get("/", verifyAccessToken, verifyAdmin, getUsers);
router.get("/:id", verifyAccessToken, verifyAdmin, getUserById);

module.exports = router;

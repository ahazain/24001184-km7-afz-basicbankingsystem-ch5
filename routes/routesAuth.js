const express = require("express");
const authController = require("../controllers/authControllers");
const authenticateToken = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/authenticate", authenticateToken, authController.showTransaksi);

module.exports = router;

const express = require("express");
const {
  signupUser,
  getLoggedinUser,
  signinUser,
} = require("../controller");
const authenticate = require("../middleware/authenticate");
const { verifyEmail, updateProfile, logOutUser } = require("../controller/userController");
const router = express.Router();

router.post("/api/signup", signupUser);
router.post('/api/verify-email', verifyEmail);
router.post("/api/login", signinUser);

router.get("/api/users/me", authenticate, getLoggedinUser);
router.get("/api/users/logout", authenticate, logOutUser);
router.put("/api/profile/:userId", authenticate, updateProfile);

module.exports = router;

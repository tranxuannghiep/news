const express = require("express");
const {
  register,
  login,
  updatePassword,
  resetPassword,
  forgotPassword,
} = require("../controllers/authControllers");
const { basicAuth } = require("../middlewares/basicAuth");
const { jwtAuth } = require("../middlewares/jwtAuth");
const { limiter } = require("../middlewares/rateLimit");
const router = express.Router();

router.post("/register", basicAuth, register);
router.post("/login", basicAuth, limiter(5, 1), login);
router.patch("/updatePassword", jwtAuth, updatePassword);
router.post("/forgotPassword", forgotPassword);
router.post("/resetPassword", resetPassword);
module.exports = router;

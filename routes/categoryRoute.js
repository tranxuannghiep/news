const express = require("express");
const {
  createCategory,
  getCategory,
} = require("../controllers/categoryControllers");
const { jwtAuth } = require("../middlewares/jwtAuth");

const router = express.Router();
router.get("/", jwtAuth, getCategory);
router.post("/", jwtAuth, createCategory);

module.exports = router;

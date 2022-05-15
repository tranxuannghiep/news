const express = require("express");
const { ROLE } = require("../config");
const {
  getAllUsers,
  getUserDetail,
  deleteUser,
  updateRoleUser,
} = require("../controllers/userControllers");
const { authorize } = require("../middlewares/authorize");

const { jwtAuth } = require("../middlewares/jwtAuth");
const router = express.Router();

router.get("/", jwtAuth, authorize(ROLE.ADMIN), getAllUsers);
router.get("/:id", jwtAuth, authorize(ROLE.ADMIN), getUserDetail);
router.delete("/:id", jwtAuth, authorize(ROLE.ADMIN), deleteUser);
router.patch("/:id", jwtAuth, authorize(ROLE.ADMIN), updateRoleUser);
module.exports = router;

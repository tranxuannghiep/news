const express = require("express");
const {
  mysql_getAllUsers,
  mysql_createUser,
} = require("../../controllers/mysql/mysql_userControllers");

const router = express.Router();

router.get("/", mysql_getAllUsers);
router.post("/", mysql_createUser);

module.exports = router;

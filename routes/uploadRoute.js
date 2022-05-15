const express = require("express");
const { getFiles } = require("../controllers/uploadControllers");
const { basicAuth } = require("../middlewares/basicAuth");

const router = express.Router();

router.get("/:filename", getFiles);

module.exports = router;

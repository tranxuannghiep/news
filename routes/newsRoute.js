const express = require("express");
const { getNews, getNewsAll } = require("../controllers/newsControllers");

const router = express.Router();

router.get("/", getNews);
router.get("/all", getNewsAll);

module.exports = router;

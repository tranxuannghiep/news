const express = require("express");
const { ROLE } = require("../config");
const {
  getBooks,
  createBook,
  deleteBook,
  updateBook,
  getBookDetail,
} = require("../controllers/bookControllers");
const { authorize } = require("../middlewares/authorize");
const { jwtAuth } = require("../middlewares/jwtAuth");
const router = express.Router();

router.get("/", getBooks);

router.get("/:id", jwtAuth, getBookDetail);
// chỉ cho phép guest
router.post("/", jwtAuth, authorize(ROLE.GUEST, ROLE.ADMIN), createBook);
// chỉ cho phép admin
router.delete("/:id", jwtAuth, authorize(ROLE.ADMIN, ROLE.GUEST), deleteBook);

router.patch("/:id", jwtAuth, updateBook);

module.exports = router;

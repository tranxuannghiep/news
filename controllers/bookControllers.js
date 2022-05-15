const catchAsync = require("../middlewares/async");
const Book = require("../models/Book");

const ApiError = require("../utils/ApiError");
const { pick } = require("../utils/pick");

exports.getBooks = catchAsync(async (req, res) => {
  const data = await Book.paginate({}, pick(req));
  const docs = data.docs;
  delete data.docs;
  res.json({
    success: true,
    data: docs,
    paginate: { ...data },
  });
});

exports.createBook = catchAsync(async (req, res) => {
  const { title, description, price, category } = req.body;
  const author = req.user.email;
  const book = await Book.create({
    title,
    description,
    author,
    price,
    category,
  });
  res.status(201).json(book);
});

exports.deleteBook = catchAsync(async (req, res) => {
  const { id } = req.params;
  const author = req.user.email;
  await Book.deleteOne({ _id: id, author });
  res.json({ success: true });
});

exports.updateBook = catchAsync(async (req, res) => {
  const { id } = req.params;
  const author = req.user.email;
  const { title, description, price } = req.body;
  const book = await Book.findOneAndUpdate(
    { _id: id, author },
    {
      title,
      description,
      price,
    },
    { new: true }
  );
  res.json({
    success: true,
    data: book,
  });
});

exports.getBookDetail = catchAsync(async (req, res) => {
  const { id } = req.params;
  const book = await Book.findById(id);
  if (!book) throw new ApiError(404, "Not Found");
  res.json({
    success: true,
    data: book,
  });
});

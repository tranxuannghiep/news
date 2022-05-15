const catchAsync = require("../middlewares/async");
const Categoty = require("../models/Categoty");

exports.getCategory = catchAsync(async (req, res) => {
  const categories = await Categoty.find();
  res.json({
    success: true,
    data: categories,
  });
});

exports.createCategory = catchAsync(async (req, res) => {
  const { name, description } = req.body;
  const category = await Categoty.create({ name, description });
  res.json({
    success: true,
    category,
  });
});

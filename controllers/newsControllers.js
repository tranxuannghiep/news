const catchAsync = require("../middlewares/async");
const News = require("../models/News");
const ApiError = require("../utils/ApiError");

exports.getNews = catchAsync(async (req, res) => {
  const news = await News.find();
  if (!news.length) {
    throw new ApiError(400, "No news");
  }
  res.json({ success: true, data: news });
});

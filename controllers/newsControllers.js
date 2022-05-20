const catchAsync = require("../middlewares/async");
const News = require("../models/News");
const ApiError = require("../utils/ApiError");
let Parser = require("rss-parser");
let parser = new Parser();
exports.getNews = catchAsync(async (req, res) => {
  (async () => {
    let feed = await parser.parseURL("https://vnexpress.net/rss/thoi-su.rss");

    console.log(feed.title);

    feed.items.forEach((item) => {
      console.log(item.title);
    });
    res.json({ success: true, data: feed });
  })();
  // const news = await News.find();
  // if (!news.length) {
  //   throw new ApiError(400, "No news");
  // }
});

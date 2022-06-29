const catchAsync = require("../middlewares/async");
const News = require("../models/News");
const ApiError = require("../utils/ApiError");
let Parser = require("rss-parser");
let parser = new Parser();
exports.getNews = catchAsync(async (req, res) => {
  const news = await News.find();
  res.json({ success: true, data: news });
  if (!news.length) {
    throw new ApiError(400, "No news");
  }
});

//npm i rss-parser

function getImages(string) {
  const imgRex = /<img.*?src="(.*?)"[^>]+>/g;
  const images = [];
  let img;
  while ((img = imgRex.exec(string))) {
    images.push(img[1]);
  }
  return images;
}
// const imgs = getImages(htmlString);
// console.log(imgs[0]);

exports.getNewsAll = catchAsync(async (req, res) => {
  (async () => {
    let feed = await parser.parseURL("https://tuoitre.vn/rss/thoi-su.rss");

    const data = feed.items.map((val) => ({
      Title: val.title,
      Img: getImages(val.content)[0] || null,
      Link: val.link,
      Description: val.contentSnippet,
      PubDate: new Date(val.pubDate).toLocaleString("es-ar", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
    }));

    res.json({ success: true, data: data });
  })();
});

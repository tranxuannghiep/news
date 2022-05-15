const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const Schema = mongoose.Schema;

const NewsSchema = new Schema(
  {
    description: String,
    time: String,
    detail: String,
    thumbnail: String,
    title: String,
    location: String,
  },
  {
    collection: "nb-news",
  }
);

NewsSchema.plugin(mongoosePaginate);

mongoose.set("runValidators", true);
module.exports = mongoose.model("News", NewsSchema);

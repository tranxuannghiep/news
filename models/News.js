const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const Schema = mongoose.Schema;

const NewsSchema = new Schema(
  {
    SortContent: String,
    FCreateTime: String,
    FDescription: String,
    Image: String,
    FName: String,
    FLevel: Number,
  },
  {
    collection: "nb-news",
  }
);

NewsSchema.plugin(mongoosePaginate);

mongoose.set("runValidators", true);
module.exports = mongoose.model("News", NewsSchema);

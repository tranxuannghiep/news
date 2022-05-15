const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const Schema = mongoose.Schema;

const BookSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "title is required"],
    },
    description: String,
    author: {
      type: String,
    },
    price: {
      type: Number,
      required: [true, "price is required"],
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
    },
  },
  {
    collection: "nb-books",
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

BookSchema.virtual("author_detail", {
  ref: "User",
  localField: "author",
  foreignField: "email",
  justOne: true,
});

BookSchema.plugin(mongoosePaginate);

mongoose.set("runValidators", true);
module.exports = mongoose.model("Book", BookSchema);

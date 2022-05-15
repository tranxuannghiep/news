const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategorySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
      unique: true,
    },
    description: String,
  },
  {
    collection: "nb-categories",
    timestamps: true,
  }
);

module.exports = mongoose.model("Category", CategorySchema);
